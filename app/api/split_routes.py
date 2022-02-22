from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Split, Exercise, DaysExercises
from app.forms import DayForm
from app.api.auth_routes import validation_errors_to_error_messages
import datetime

split_routes = Blueprint('split', __name__)

@split_routes.route('/', methods=["GET"])
def getSplits(user_id):
    splits = Split.query.filter(user_id == Split.user_id).all()

    for split in splits:
        days = Day.query.filter(split.id == Day.split_id).all()
        split.days = days

    return { "splits": [split.to_dict() for split in splits]}

@split_routes.route('/', methods=["POST"])
def addSplit(user_id):
    data = request.json
    # print(data)

    split_date = datetime.datetime.now()
    # print(split_date.weekday())

    new_split = Split(
        name =  "temp",
        user_id = user_id,
        start_date = split_date
    )

    db.session.add(new_split)
    db.session.commit()

    for day in data:
        day_to_update = Day.query.filter(data[day] == Day.id).one()
        day_to_update.split_id = new_split.id
        day_to_update.assigned = True
        day_to_update.assigned_day = day

    db.session.commit()

    return data

@split_routes.route('/', methods=["PATCH"])
def editSplit(user_id):
    pass

@split_routes.route('/', methods=["DELETE"])
def deleteSplit(user_id):
    pass
