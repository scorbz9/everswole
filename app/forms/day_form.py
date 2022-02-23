from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, FieldList, FormField
from wtforms.validators import DataRequired, Optional

class Exercise(FlaskForm):
    name = SelectField('name', choices=[])
    goal = StringField('goal', validators=[])
    actual = StringField('actual', validators=[])
    notes = StringField('notes', validators=[])

class DayForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    workoutInputList = FieldList(FormField(Exercise), validators=[Optional()])
