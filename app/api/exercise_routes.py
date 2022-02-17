from flask import Blueprint, jsonify, session, request
from app.models import db, Exercise


exercise_routes = Blueprint('exercise', __name__)

@exercise_routes.route('/', methods=['GET'])
def getExercises():
    exercises = Exercise.query.all()

    return { 'exercises': [exercise.to_dict() for exercise in exercises] }
