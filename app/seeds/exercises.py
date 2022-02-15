from app.models import db, Exercise


# Adds a demo user, you can add other users here if you want
def seed_exercises():
    flat_bench = Exercise(
        name='Flat Bench')
    low_bar_squat = Exercise(
        name='Low Bar Squat')
    deadlift = Exercise(
        name='Deadlift')
    incline_bench = Exercise(
        name='Incline Bench')
    weighted_pullups = Exercise(
        name='Weighted Pullups')
    bent_over_row = Exercise(
        name='Bent Over Row')
    high_bar_squat = Exercise(
        name='High Bar Squat')
    bicep_curls = Exercise(
        name='Bicep Curls')
    leg_press = Exercise(
        name='Leg Press')
    leg_extension = Exercise(
        name='Leg Extension')
    calf_raise = Exercise(
        name='Calf Raise')

    db.session.add(flat_bench)
    db.session.add(low_bar_squat)
    db.session.add(deadlift)
    db.session.add(incline_bench)
    db.session.add(weighted_pullups)
    db.session.add(bent_over_row)
    db.session.add(high_bar_squat)
    db.session.add(bicep_curls)
    db.session.add(leg_press)
    db.session.add(leg_extension)
    db.session.add(calf_raise)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()
