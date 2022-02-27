from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Exercise, DaysExercises
from app.forms import DayForm
from app.api.auth_routes import validation_errors_to_error_messages
from sqlalchemy import desc

day_routes = Blueprint('day', __name__)

@day_routes.route('/', methods=["GET"])
def getDays(user_id):

    days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(user_id == Day.user_id) \
            .order_by(desc(Day.created_at)) \
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

                if len(new_association.goal) > 30:
                    return { "errors": ["Goals must be 30 characters or less."]}
                return { "errors": ["Please enter each exercise only once."]}

        days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(user_id == Day.user_id) \
            .order_by(desc(Day.created_at)) \
            .all()

        return { "days": [item.to_dict() for item in days] }

    return { "errors": validation_errors_to_error_messages(form.errors) }

@day_routes.route('/<int:day_id>/', methods=['PATCH'])
def editOneDay(user_id, day_id):
    data = request.json
    form = DayForm();
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        day_to_update = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(Day.id == day_id) \
            .one()

        day_to_update.name = data['name']

        exercises = Exercise.query.all()

        # Handles case where an exercise was deleted
        if len(data['workoutInputList']) < len(day_to_update.exercises):
            for exercise in day_to_update.exercises[len(data['workoutInputList']): ]:
                DaysExercises.query \
                    .filter(DaysExercises.day_id == exercise.day_id, DaysExercises.exercise_id == exercise.exercise_id) \
                    .delete()

                db.session.commit()

        error_array = []

        # Update existing associations
        for exercise in day_to_update.exercises:
            index = day_to_update.exercises.index(exercise)

            current_exercise = Exercise.query.filter(data['workoutInputList'][index]['name'] == Exercise.name).one()

            if len(data['workoutInputList'][index]['goal']) > 30:
                print('too long')
                error_array.append("Goals must be less than 30 characters.")
            if len(data['workoutInputList'][index]['actual']) > 30:
                print('too long')
                error_array.append("Actual field must be less than 30 characters.")
            if len(data['workoutInputList'][index]['notes']) > 500:
                print('too long')
                error_array.append("Notes must be less than 500 characters.")

            exercise.exercise_id = current_exercise.id
            exercise.goal = data['workoutInputList'][index]['goal']
            exercise.actual = data['workoutInputList'][index]['actual']
            exercise.notes = data['workoutInputList'][index]['notes']


        try:
            db.session.commit()
        except:
            print(error_array)
            if len(error_array) > 0:
                return { "errors": error_array }
            return { "errors": ["Please enter each exercise only once."]}

        # Handles case where an exercise was added
        if len(data['workoutInputList']) > len(day_to_update.exercises):

            for exercise in data['workoutInputList'][len(day_to_update.exercises): ]:
                current_exercise = list(filter(lambda exer: exer.name == exercise['name'], exercises))

                new_association = DaysExercises(
                    day_id = day_to_update.id,
                    exercise_id = current_exercise[0].id,
                    goal = exercise['goal'],
                    actual = exercise['actual'],
                    notes = exercise['notes']
                )

                try:
                    db.session.add(new_association)
                    db.session.commit()
                except:
                    error_array = []
                    if len(new_association.goal) > 30:
                        error_array.append("Goals must be less than 30 characters.")
                    if len(new_association.actual) > 30:
                        error_array.append("Actual field must be less than 30 characters.")
                    if len(new_association.notes) > 500:
                        error_array.append("Notes must be less than 500 characters.")
                    if len(new_association.goal) < 30 and len(new_association.actual) < 30 and len(new_association.notes) < 500:
                        return { "errors": ["Please enter each exercise only once."]}

                    return { "errors": error_array }

        days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(user_id == Day.user_id) \
            .order_by(desc(Day.created_at)) \
            .all()

        return { "days": [item.to_dict() for item in days] }

    return { "errors": validation_errors_to_error_messages(form.errors) }

@day_routes.route('/<int:day_id>/', methods=['DELETE'])
def deleteOneDay(user_id, day_id):
    DaysExercises.query \
        .filter(DaysExercises.day_id == day_id) \
        .delete()

    Day.query \
        .filter(Day.id == day_id) \
        .delete()

    db.session.commit()

    days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(user_id == Day.user_id) \
            .order_by(desc(Day.created_at)) \
            .all()

    return { "days": [item.to_dict() for item in days] }
