// React/Redux imports
import React from "react";
import { useSelector } from "react-redux";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";

import './MyExercises.css'

const MyExercises = ({ showExercises, setShowExercises }) => {
    const exercises = useSelector(state => state.exerciseState.entries);
    return (
        showExercises ?
        <div className="overlay-wrapper">
            <div className="my-exercises-container">
                <div className="my-exercises-inner-container">
                    <div className="my-exercises-info-container">
                        <div className="my-exercises-header">
                            My Exercises
                        </div>
                        <FontAwesomeIcon icon={faXmark} onClick={() => setShowExercises(false)} className="cancel-my-exercises"/>
                        {exercises.map(exercise => {
                            return (
                                <div className="my-exercises-single-exercise">
                                    <div className="single-exercise-name">{exercise.name}</div>
                                    <div className="single-exercise-buttons-container">
                                        <FontAwesomeIcon icon={faEdit} className="single-exercise-button"/>
                                        <FontAwesomeIcon icon={faXmark} className="single-exercise-button"/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

        : <></>
    )
}

export default MyExercises;
