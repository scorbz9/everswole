from .db import db

days_exercises = db.Table(
    "day_exercise",
    db.Column("day_id", db.Integer, db.ForeignKey("days.id"), primary_key=True),
    db.Column("exercise_id", db.Integer, db.ForeignKey("exercises.id"), primary_key=True),
    db.Column("goal", db.String(30)),
    db.Column("actual", db.String(30)),
    db.Column("notes", db.String(500))
)


class Day(db.Model):
    __tablename__ = "days"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    split_id = db.Column(db.Integer, db.ForeignKey("splits.id"))

    splits = db.relationship("Split", back_populates="days")
    exercises = db.relationship("Exercise", back_populates="days", secondary=days_exercises)

class Exercise(db.Model):
    __tablename__ = "exercises"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    days = db.relationship("Day", back_populates="exercises", secondary=days_exercises)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
