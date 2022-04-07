from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class ExerciseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=50)])
