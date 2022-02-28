from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Split, Exercise, DaysExercises
from app.forms import DayForm, SplitForm
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime, timedelta
from sqlalchemy import asc, desc


split_routes = Blueprint('split', __name__)

@split_routes.route('/', methods=["GET"])
def getSplits(user_id):
    splits = Split.query.filter(user_id == Split.user_id).order_by(desc(Split.created_at)).all()

    for split in splits:
        days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(Day.split_id == split.id) \
            .order_by(desc(Day.created_at)) \
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

        if current_date.weekday() == 6:
            split_date = current_date
        else:
            split_date = current_date - timedelta(days=current_date.weekday() + 1)

        splits_to_check = Split.query.filter(Split.user_id == user_id).all()

        for split in splits_to_check:
            current_split_date = split.start_date

            if split_date.date() == current_split_date.date():
                return { "errors": ["A split for the current week already exists."] }

        new_split = Split(
            name = data["name"],
            user_id = user_id,
            start_date = split_date
        )

        db.session.add(new_split)
        db.session.commit()

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

        splits = Split.query.filter(user_id == Split.user_id).order_by(desc(Split.created_at)).all()

        for split in splits:
            days = Day.query \
                .join(DaysExercises) \
                .join(Exercise) \
                .filter(Day.split_id == split.id) \
                .order_by(desc(Day.created_at)) \
                .all()
            split.days = days

        return { "splits": [split.to_dict() for split in splits] }

    return { "errors": [validation_errors_to_error_messages(form.errors)]}

@split_routes.route('/<int:split_id>/', methods=["PATCH"])
def editSplit(user_id, split_id):
    data = request.json
    form = SplitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # Update days that ASSIGNED
        for day in range(len(data['days'])):
            current_day_id = list(data['days'][day].values())[0]
            current_day_name = list(data['days'][day].keys())[0]

            if current_day_id == "":
                continue
            else:
                current_day = Day.query \
                    .filter(Day.id == current_day_id) \
                    .one()

                current_day.split_id = split_id
                current_day.assigned_day = current_day_name
                current_day.assigned = True

        # Update all days that were UNASSIGNED during edit
        for day in data['unassigned']:
            current_day = Day.query \
                .filter(Day.id == day['id']) \
                .one()

            current_day.split_id = None
            current_day.assigned_day = None
            current_day.assigned = False

        split_to_update = Split.query \
            .filter(Split.id == split_id) \
            .one()

        split_to_update.name = data['name']

        db.session.commit()

        splits = Split.query.filter(user_id == Split.user_id).order_by(desc(Split.created_at)).all()

        for split in splits:
            days = Day.query \
                .join(DaysExercises) \
                .join(Exercise) \
                .filter(Day.split_id == split.id) \
                .order_by(desc(Day.created_at)) \
                .all()
            split.days = days

        return { "splits": [split.to_dict() for split in splits] }

    return { "errors": [validation_errors_to_error_messages(form.errors)]}

@split_routes.route('/<int:split_id>/', methods=["DELETE"])
def deleteSplit(user_id, split_id):

    # Get rid of assignment to split for each day
    days_to_delete = Day.query \
        .filter(Day.split_id == split_id) \
        .all()

    for day in days_to_delete:
        day.split_id = None
        day.assigned_day = None
        day.assigned = False

    Split.query \
        .filter(Split.id == split_id) \
        .delete()

    db.session.commit()

    splits = Split.query.filter(user_id == Split.user_id).order_by(desc(Split.created_at)).all()

    for split in splits:
        days = Day.query \
            .join(DaysExercises) \
            .join(Exercise) \
            .filter(Day.split_id == split.id) \
            .order_by(desc(Day.created_at)) \
            .all()
        split.days = days

    return { "splits": [split.to_dict() for split in splits] }
