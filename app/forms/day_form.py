from dataclasses import Field
from tkinter.tix import Select
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FieldList, FormField
from wtforms.validators import DataRequired

class Workout(FlaskForm):
    name = SelectField('name', choices=[])
    goal = StringField('goal', validators=[DataRequired()])

class DayForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    workoutInputList = FieldList(FormField(Workout))
