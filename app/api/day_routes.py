from flask import Blueprint, jsonify, session, request
from app.models import db, Day, Exercise, days_exercises
from app.forms import DayForm


day_routes = Blueprint('day', __name__)

@day_routes.route('/', methods=['POST'])
def addOneExercise():
    data = request.json
    form = DayForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print(data)

        new_day = Day(
            name = data['name']

        )

        print(new_day.exercises)

        db.session.add(new_day)
        db.session.commit()
