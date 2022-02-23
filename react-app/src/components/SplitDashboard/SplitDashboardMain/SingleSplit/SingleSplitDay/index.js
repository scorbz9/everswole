import React from "react";
import { useSelector } from "react-redux";

import './SingleSplitDay.css'

const SingleSplitDay = ({ day, dayOfWeek, setShowMain }) => {
    const days = useSelector(state => state.dayState.entries)
    const currentDay = days.indexOf(day)
    console.log(currentDay)
    const toggleEditDay = () => {
        setShowMain(`SingleDay${currentDay}`)
    }

    return (
        <div className="single-split-day-container">
                    <h3 className="single-split-day-header">{dayOfWeek}</h3>
                    <div className="single-split-day-info">
                        <h3>{day ? day.name : ""}</h3>
                        {day ? <div className="single-split-edit-day-button" onClick={toggleEditDay}>
                                View
                        </div>: <></>}
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
