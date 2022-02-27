from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, FieldList, FormField
from wtforms.validators import DataRequired, Optional, Length

class Exercise(FlaskForm):
    name = SelectField('name', choices=[])
    goal = StringField('goal', validators=[Optional(), Length(min=1, max=30)])
    actual = StringField('actual', validators=[Optional()])
    notes = StringField('notes', validators=[Optional()])

class DayForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=50)])
    workoutInputList = FieldList(FormField(Exercise), validators=[Optional()])
