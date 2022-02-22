import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditDayForm from "./EditDayForm";

import './SingleDay.css'

const SingleDay = ({ showMain, setShowMain }) => {
    const index = showMain.substring(9)
    const days = useSelector(state => state.dayState.entries)

    const currentDay = days[index]

    const [showEditForm, setShowEditForm] = useState(false)

    const toggleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    if (!showEditForm) {

        return (
            <div className="single-day-container">
                <div className="single-day-info-container">
                    <h2 className="single-day-header">{currentDay.name}</h2>
                    <div className="single-day-edit-button" onClick={toggleEdit}>
                        Edit
                    </div>
                    {currentDay.exercises.map((exercise, i) => {
                        return (
                            <div key={i} className="single-day-exercise-container">
                                <div className="single-day-exercise-number single-day-exercise-element">
                                    {`Exercise #${i + 1}:`}
                                </div>
                                <div className="single-day-exercise-name single-day-exercise-element">
                                    {exercise.name}
                                </div>
                                <div className="single-day-exercise-goal single-day-exercise-element">
                                    Goal: {exercise.goal}
                                </div>
                                <div className="single-day-exercise-actual single-day-exercise-element">
                                    Actual: {exercise.actual}
                                </div>
                                <div className="single-day-exercise-notes single-day-exercise-element">
                                    Notes: {exercise.notes}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {

        return (
            <EditDayForm currentDay={currentDay} toggleEdit={toggleEdit} setShowMain={setShowMain} />
        )
    }

}

export default SingleDay
