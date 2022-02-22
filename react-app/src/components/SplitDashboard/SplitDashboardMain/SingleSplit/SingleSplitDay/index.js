import React from "react";


import './SingleSplitDay.css'

const SingleSplitDay = ({ day, dayOfWeek, toggleEdit }) => {


    return (
        <div className="single-split-day-container">
                    <h3 className="single-split-day-header">{dayOfWeek}</h3>
                    <div className="single-split-day-info">
                        <h3>{day ? day.name : ""}</h3>
                        <div className="single-split-edit-day-button" onClick={toggleEdit}>
                            Edit Day
                        </div>
                        {day ? day.exercises.map((exercise, i) => {
                            return (
                                <div key={i} className="single-split-day-exercise-container">
                                    <div className="single-split-day-exercise-element">
                                        <strong>Exercise #{`${i + 1}`}: </strong>{exercise.name}
                                    </div>
                                    <div className="single-split-day-exercise-element">
                                        <strong>Goal: </strong>{exercise.goal}
                                    </div>
                                    <div className="single-split-day-exercise-element">
                                        <strong>Actual: </strong>{exercise.actual}
                                    </div>
                                    <div className="single-split-day-exercise-element single-split-day-exercise-notes">
                                        <strong>Notes: </strong>{exercise.notes}
                                    </div>
                                </div>
                            )
                        }): <div>Rest Day</div>}
                    </div>
                </div>
    )
}

export default SingleSplitDay
