from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Exercise, DaysExercises
from app.forms import DayForm


day_routes = Blueprint('day', __name__)

@day_routes.route('/', methods=['POST'])
def addOneExercise():
    data = request.json
    form = DayForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_day = Day(
            name = data['name']
        )

        db.session.add(new_day)
        db.session.commit()

        exercises = Exercise.query.all()

        for exercise in data['workoutInputList']:

            current_exercise = list(filter(lambda exer: exer.name == exercise['name'], exercises))

            new_association = DaysExercises(
                day_id = new_day.id,
                exercise_id = current_exercise[0].id,
                goal = exercise['goal']
            )

            db.session.add(new_association)
            db.session.commit()
