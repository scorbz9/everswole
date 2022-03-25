from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Exercise, DaysExercises
from app.forms import DayForm
from app.api.auth_routes import validation_errors_to_error_messages
from sqlalchemy import desc, asc

day_routes = Blueprint('day', __name__)

@day_routes.route('/', methods=["GET"])
def getDays(user_id):

    days = Day.query \
            .filter(user_id == Day.user_id) \
            .order_by(desc(Day.created_at)) \
            .all()

    for day in days:
        days_exercises = DaysExercises.query \
                .filter(day.id == DaysExercises.day_id) \
                .order_by(asc(DaysExercises.created_at)) \
                .all()

        day.exercises = days_exercises

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

        for day in days:
            days_exercises = DaysExercises.query \
                    .filter(day.id == DaysExercises.day_id) \
                    .order_by(asc(DaysExercises.created_at)) \
                    .all()

            day.exercises = days_exercises

        return { "days": [item.to_dict() for item in days] }

    return { "errors": validation_errors_to_error_messages(form.errors) }

@day_routes.route('/<int:day_id>/', methods=['PATCH'])
def editOneDay(user_id, day_id):
    data = request.json
    form = DayForm();
    form['csrf_token'].data = request.cookies['csrf_token']

    # Variable holding incoming data
    incoming_exercises = data['workoutInputList']

    if form.validate_on_submit():

        # Validate input lengths
        error_array = []

        for incoming_exercise in incoming_exercises:
            if len(incoming_exercise['goal']) > 30:
                error_array.append("Goals must be less than 30 characters.")
            if len(incoming_exercise['actual']) > 30:
                error_array.append("Actual field must be less than 30 characters.")
            if len(incoming_exercise['notes']) > 500:
                error_array.append("Notes must be less than 500 characters.")

        if len(error_array) > 0:
            return { "errors": error_array }

        day_to_update = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(Day.id == day_id) \
            .one()

        # Variable holding existing data
        existing_exercises = day_to_update.exercises

        # Store lengths for incoming data and existing data
        incoming_exercises_length = len(incoming_exercises)
        day_to_update_exercises_length = len(existing_exercises)

        # Update day name
        day_to_update.name = data['name']

        # Handle case where exercises are deleted
        # Check if incoming data has less exercises than existing data in database
        if incoming_exercises_length < day_to_update_exercises_length:
            # Iterate through and delete excess days in existing data in database
            for existing_exercise in existing_exercises[incoming_exercises_length: ]:
                DaysExercises.query \
                    .filter(DaysExercises.id == existing_exercise.id) \
                    .delete()

                db.session.commit()

        # Update existing data in database
        # Iterate through existing data
        for existing_exercise in day_to_update.exercises:
            # Save current iteration index
            index = existing_exercises.index(existing_exercise)

            # Perform updates for each exercise in database
            existing_exercise.exercise_id = incoming_exercises[index]['exercise_id']
            existing_exercise.goal = incoming_exercises[index]['goal']
            existing_exercise.actual = incoming_exercises[index]['actual']
            existing_exercise.notes = incoming_exercises[index]['notes']

            db.session.commit()

        # Handle case where exercises are added
        # Check if incoming data has more exercises than existing data in database
        if incoming_exercises_length > day_to_update_exercises_length:
            # Iterate through excess days in incoming data
            for incoming_exercise in incoming_exercises[day_to_update_exercises_length: ]:

                new_association = DaysExercises(
                    day_id = day_id,
                    exercise_id = incoming_exercise['exercise_id'],
                    goal = incoming_exercise['goal'],
                    actual = incoming_exercise['actual'],
                    notes = incoming_exercise['notes']
                )

                db.session.add(new_association)
                db.session.commit()

        days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(user_id == Day.user_id) \
            .order_by(desc(Day.created_at)) \
            .all()

        for day in days:
            days_exercises = DaysExercises.query \
                    .filter(day.id == DaysExercises.day_id) \
                    .order_by(asc(DaysExercises.created_at)) \
                    .all()

            day.exercises = days_exercises

        return { "days": [item.to_dict() for item in days] }

    error_array = validation_errors_to_error_messages(form.errors)

    # Validate input lengths
    for incoming_exercise in incoming_exercises:
        if len(incoming_exercise['goal']) > 30:
            error_array.append("Goals must be less than 30 characters.")
        if len(incoming_exercise['actual']) > 30:
            error_array.append("Actual field must be less than 30 characters.")
        if len(incoming_exercise['notes']) > 500:
            error_array.append("Notes must be less than 500 characters.")

    return { "errors": error_array }

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

    for day in days:
        days_exercises = DaysExercises.query \
                .filter(day.id == DaysExercises.day_id) \
                .order_by(asc(DaysExercises.created_at)) \
                .all()

        day.exercises = days_exercises

    return { "days": [item.to_dict() for item in days] }
