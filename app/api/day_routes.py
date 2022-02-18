from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Exercise, DaysExercises
from app.forms import DayForm
from app.api.auth_routes import validation_errors_to_error_messages


day_routes = Blueprint('day', __name__)

@day_routes.route('/', methods=["GET"])
def getDays(user_id):

    days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(user_id == Day.user_id) \
            .all()

    return { "days": [item.to_dict() for item in days] }

@day_routes.route('/', methods=['POST'])
def addOneDay(user_id):
    data = request.json
    form = DayForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_day = Day(
            name = data['name'],
            user_id = data['userId']
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
            try:
                db.session.add(new_association)
                db.session.commit()
            except:
                return { "errors": ["Please enter each exercise only once."]}

        days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(user_id == Day.user_id) \
            .all()

        return { "days": [item.to_dict() for item in days] }

    return { "errors": validation_errors_to_error_messages(form.errors) }
