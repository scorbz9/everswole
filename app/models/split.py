from .db import db
from sqlalchemy import func


class Split(db.Model):
    __tablename__ = "splits"

    id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    start_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    end_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    users = db.relationship("User", back_populates="splits")
    days = db.relationship("Day", back_populates="splits")

    def to_dict(self):
        return {
            'id': self.id,
            # 'name': self.name,
            'days': [{
                'id': day.id,
                'name': day.name,
                'exercises': [{
                    'id': exercise.exercise.id,
                    'name': exercise.exercise.name,
                    'goal': exercise.goal,
                    'actual': exercise.actual,
                    'notes': exercise.notes } for exercise in day.exercises],
                'split_id': day.split_id,
                'user_id': day.user_id,
                'assigned': day.assigned,
                'assigned_day': day.assigned_day } for day in self.days],
            'user_id': self.user_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
        }
