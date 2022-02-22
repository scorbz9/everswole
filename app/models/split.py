from .db import db
from sqlalchemy import func

class Split(db.Model):
    __tablename__ = "splits"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    start_date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    users = db.relationship("User", back_populates="splits")
    days = db.relationship("Day", back_populates="splits")

    def to_dict(self):
        return {
            'id': self.id,
            'days': [day.name for day in self.days],
            'user_id': self.user_id,
            'start_date': self.start_date
        }
