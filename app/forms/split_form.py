from dataclasses import Field
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, FieldList, FormField
from wtforms.validators import DataRequired, Optional

class SplitForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
