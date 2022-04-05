from dataclasses import Field
from flask_wtf import FlaskForm
from wtforms import DateTimeField, StringField
from wtforms.validators import DataRequired, Optional, Length

class SplitForm(FlaskForm):
    # name = StringField('Name', validators=[DataRequired(), Length(min=1, max=50)])
    startDate = StringField('Start Date', validators=[DataRequired()])
