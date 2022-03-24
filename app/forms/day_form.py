from flask_wtf import FlaskForm
from wtforms import Form, StringField, SelectField, TextAreaField, FieldList, FormField
from wtforms.validators import DataRequired, Optional, Length

class Exercise(Form):
    name = SelectField('name', validate_choice=False)
    goal = StringField('goal', validators=[])
    actual = StringField('actual', validators=[])
    notes = TextAreaField('notes', validators=[])

class DayForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=50)])
    workoutInputList = FieldList(FormField(Exercise), min_entries=1, max_entries=9)
