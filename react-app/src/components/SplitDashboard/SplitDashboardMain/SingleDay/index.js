import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditDayForm from "./EditDayForm";

import './SingleDay.css'

const SingleDay = ({ showMain, setShowMain, setShowEditMessage, setShowDeleteMessage }) => {
    const index = showMain.substring(9)
    const days = useSelector(state => state.dayState.entries)

    const currentDay = days[index]

    const [showEditForm, setShowEditForm] = useState(false)

    const toggleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    if (!showEditForm) {

        return (
            <div className="single-day-container main-content-container">
                <div className="single-day-info-container">
                    <h2 className="single-day-header">{currentDay?.name}</h2>
                    <div className="single-day-edit-button" onClick={toggleEdit}>
                        Edit
                    </div>
                    {currentDay?.exercises.map((exercise, i) => {
                        return (
                            <div key={i} className="single-day-exercise-container ">

                                    <strong className="single-day-label">{`Exercise #${i + 1}:`}</strong>
                                    <div className="single-day-exercise-name single-day-exercise-element">
                                        {exercise.name}
                                    </div>

                                <strong className="single-day-label">Goal: </strong>
                                <div className="single-day-exercise-goal single-day-exercise-element">
                                    {exercise.goal}
                                </div>
                                <strong className="single-day-label">Actual: </strong>
                                <div className="single-day-exercise-actual single-day-exercise-element">
                                    {exercise.actual}
                                </div>
                                <strong className="single-day-label">Notes: </strong>
                                <div className="single-day-exercise-notes single-day-exercise-element">
                                    {exercise.notes}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {

        return (
            <EditDayForm
                currentDay={currentDay}
                toggleEdit={toggleEdit}
                setShowMain={setShowMain}
                setShowEditMessage={setShowEditMessage}
                setShowDeleteMessage={setShowDeleteMessage}
            />
        )
    }

}

export default SingleDay
