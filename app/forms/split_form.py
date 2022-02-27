from dataclasses import Field
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, FieldList, FormField
from wtforms.validators import DataRequired, Optional, Length

class SplitForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=1, max=50)])
