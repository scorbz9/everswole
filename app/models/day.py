from .db import db

class DaysExercises(db.Model):
    __tablename__ = 'DaysExercises'

    day_id = db.Column(db.Integer, db.ForeignKey("days.id"), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id"), primary_key=True)
    goal = db.Column(db.String(30))
    actual = db.Column(db.String(30))
    notes = db.Column(db.String(500))

    exercise = db.relationship("Exercise", back_populates="days")
    day = db.relationship("Day", back_populates="exercises")



class Day(db.Model):
    __tablename__ = "days"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    split_id = db.Column(db.Integer, db.ForeignKey("splits.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    assigned = db.Column(db.Boolean, default=False)
    assigned_day = db.Column(db.DateTime(timezone=True))

    users = db.relationship("User", back_populates="days")
    splits = db.relationship("Split", back_populates="days")
    exercises = db.relationship("DaysExercises", back_populates="day")

    def to_dict(self):

        return {
            'id': self.id,
            'name': self.name,
            'exercises': [{
                'id': exercise.exercise.id,
                'name': exercise.exercise.name,
                'goal': exercise.goal, 'actual': exercise.actual,
                'notes': exercise.notes } for exercise in self.exercises],
            'split_id': self.split_id,
            'user_id': self.user_id
        }

class Exercise(db.Model):
    __tablename__ = "exercises"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    days = db.relationship("DaysExercises", back_populates="exercise")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
