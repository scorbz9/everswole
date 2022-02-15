from .db import db
from sqlalchemy import func

class Split(db.Model):
    __tablename__ = "splits"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    start_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    end_date = db.DateTime()

    user = db.relationship("User", back_populates="splits")
