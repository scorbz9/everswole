from flask import Blueprint, jsonify, session, request
from app.models import db, Exercise
from app.forms import ExerciseForm
from app.api.auth_routes import validation_errors_to_error_messages
from sqlalchemy import asc

exercise_routes = Blueprint('exercise', __name__)

@exercise_routes.route('/', methods=['GET'])
def getExercises(user_id):

    exercises = Exercise.query \
        .filter((Exercise.user_id == None) | (Exercise.user_id == user_id)) \
        .order_by(asc(Exercise.created_at)) \
        .all()

    return { 'exercises': [exercise.to_dict() for exercise in exercises] }

@exercise_routes.route('/', methods=['POST'])
def addExercise(user_id):
    data = request.json
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_exercise = Exercise(
            name = data["name"],
            user_id = data["userId"]
        )

        db.session.add(new_exercise)
        db.session.commit()

        exercises = Exercise.query \
            .filter((Exercise.user_id == None) | (Exercise.user_id == user_id)) \
            .order_by(asc(Exercise.created_at)) \
            .all()

        return { 'exercises': [exercise.to_dict() for exercise in exercises] }

    return { 'errors': validation_errors_to_error_messages(form.errors) }


@exercise_routes.route('/', methods=['PUT'])
def editExercise(user_id):
    data = request.json
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        exercise_id = data["exerciseId"]
        exercise = Exercise.query.filter(Exercise.id == exercise_id).one()

        exercise.name = data["name"]

        db.session.commit()

        exercises = Exercise.query \
            .filter((Exercise.user_id == None) | (Exercise.user_id == user_id)) \
            .order_by(asc(Exercise.created_at)) \
            .all()

        return { 'exercises': [exercise.to_dict() for exercise in exercises] }

    return { 'errors': validation_errors_to_error_messages(form.errors) }

@exercise_routes.route('/', methods=['DELETE'])
def deleteExercise(user_id):
    data = request.json
    exercise_id = data["exerciseId"]

    Exercise.query \
        .filter(Exercise.id == exercise_id) \
        .delete()

    db.session.commit()

    exercises = Exercise.query \
        .filter((Exercise.user_id == None) | (Exercise.user_id == user_id)) \
        .order_by(asc(Exercise.created_at)) \
        .all()

    return { 'exercises': [exercise.to_dict() for exercise in exercises] }
