from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Split, Exercise, DaysExercises
from app.forms import DayForm, SplitForm
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime, timedelta

split_routes = Blueprint('split', __name__)

@split_routes.route('/', methods=["GET"])
def getSplits(user_id):
    splits = Split.query.filter(user_id == Split.user_id).all()

    for split in splits:
        days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(Day.split_id == split.id) \
            .all()
        split.days = days

    return { "splits": [split.to_dict() for split in splits] }

@split_routes.route('/', methods=["POST"])
def addSplit(user_id):
    data = request.json
    form = SplitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # Calculate nearest previous sunday (start date of split)
        current_date = datetime.today()
        split_date = current_date - timedelta(days=current_date.weekday() + 1)

        new_split = Split(
            name = data["name"],
            user_id = user_id,
            start_date = split_date
        )

        db.session.add(new_split)
        db.session.commit()
        print(data['days'], data['days'][0].values())
        for day in range(len(data['days'])):
            current_day_id = list(data['days'][day].values())[0]
            current_day_name = list(data['days'][day].keys())[0]

            if current_day_id == "":
                continue
            else:
                day_to_update = Day.query.filter(current_day_id == Day.id).one()
                day_to_update.split_id = new_split.id
                day_to_update.assigned = True
                day_to_update.assigned_day = current_day_name

        db.session.commit()

        splits = Split.query.filter(user_id == Split.user_id).all()

        for split in splits:
            days = Day.query \
                .join(DaysExercises) \
                .join(Exercise) \
                .filter(Day.split_id == split.id) \
                .all()
            split.days = days

        return { "splits": [split.to_dict() for split in splits]}

    return { "errors": ["Please provide a name for this split."]}

@split_routes.route('/', methods=["PATCH"])
def editSplit(user_id):
    pass

@split_routes.route('/', methods=["DELETE"])
def deleteSplit(user_id):
    pass
