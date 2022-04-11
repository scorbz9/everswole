from flask import Blueprint, jsonify, session, request
from app.models import db, Exercise
from app.forms import ExerciseForm
from app.api.auth_routes import validation_errors_to_error_messages


exercise_routes = Blueprint('exercise', __name__)

@exercise_routes.route('/', methods=['GET'])
def getExercises():
    exercises = Exercise.query.all()

    return { 'exercises': [exercise.to_dict() for exercise in exercises] }

@exercise_routes.route('/', methods=['POST'])
def addExercise():
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

        exercises = Exercise.query.all()

        return { 'exercises': [exercise.to_dict() for exercise in exercises] }

    return { 'errors': validation_errors_to_error_messages(form.errors) }


@exercise_routes.route('/', methods=['PUT'])
def editExercise():
    data = request.json
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
