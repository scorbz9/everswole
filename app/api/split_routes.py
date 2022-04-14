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

        # Construct python datetime obj from startDate data
        start_date = datetime.strptime(data["startDate"], '%Y-%m-%dT%H:%M:%S.%fZ')
        # Set that datetime object to be first very first milliseconds of start_date
        start_date = start_date.replace(hour=0, minute=0, second=0, microsecond=0)

        # Calculate end_date using start_date, 6 days in the future
        end_date = start_date + timedelta(days=6);
        # Set end_date to be very last milliseconds of end_date
        end_date = end_date.replace(hour=23, minute=59, second=59, microsecond=999999)

        new_split = Split(
            user_id = user_id,
            start_date = data["startDate"],
            end_date = end_date
        )

        db.session.add(new_split)
        db.session.commit()

        # Iterate through assigned days
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

        # Update days that were ASSIGNED
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

        start_date = datetime.strptime(data["startDate"], '%Y-%m-%dT%H:%M:%S.%fZ')
        end_date = start_date + timedelta(days=6);

        split_to_update.start_date = start_date
        split_to_update.end_date = end_date

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
