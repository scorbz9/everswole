// React/Redux imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";

// Store imports
import { deleteOneExercise, editOneExercise } from "../../../../store/exercise";

// Component imports
import ConfirmDelete from "../../SplitDashboardMain/ConfirmDelete";

import './MyExercises.css'

const MyExercises = ({ showExercises, setShowExercises, setShowEditMessage, setShowDeleteMessage }) => {
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exerciseState.entries);

    const [name, setName] = useState("")
    const [showEditExercise, setShowEditExercise] = useState(null)
    const [errors, setErrors] = useState([])

    const toggleEditExercise = (exerciseId) => {
        setName("")

        if (showEditExercise === exerciseId) {
            setShowEditExercise(null)
        } else {
            setShowEditExercise(exerciseId)
        }
    }

    const handleEditSubmit = async (e, exerciseId) => {
        e.preventDefault();

        const payload = {
            name,
            exerciseId
        }


        console.log(payload)

        const data = await editOneExercise(payload);

        if (data.errors) {
            setErrors([...data.errors])
        } else {
            setErrors([])
            setName("")

            // Send confirmation message
            setShowEditMessage(true)
            setTimeout(() => {
                setShowEditMessage(false)
            }, 3500);

            setShowEditExercise(null)
        }
    }

    // Shows delete confirmation popup
    const [showDelete, setShowDelete] = useState(false)

    const toggleDelete = (e) => {
        e.preventDefault();

        setShowDelete(!showDelete)
    }

    const handleDeleteExercise = async (e, exerciseId) => {
        e.preventDefault();

        await dispatch(deleteOneExercise(exerciseId))

        // Successful delete confirmation message
        setShowDeleteMessage(true)
        setTimeout(() => {
            setShowDeleteMessage(false)
        }, 4000)

        setShowDelete(false)
    }


    return (
        showExercises ?
        <div className="overlay-wrapper">
            <div className="my-exercises-container">
            {showDelete ? <ConfirmDelete typeOfDelete={"exercise"} handleDeleteExercise={handleDeleteExercise} toggleDelete={toggleDelete} /> : <></>}
                <div className="my-exercises-inner-container">
                    <div className="my-exercises-info-container">
                        <div className="my-exercises-header">
                            My Exercises
                        </div>
                        <FontAwesomeIcon icon={faXmark} onClick={() => setShowExercises(false)} className="cancel-my-exercises"/>
                        <div className="add-day-error-container">
                            {errors.map((error, ind) => (
                                <div key={ind} className="add-day-form-error">{error}</div>
                            ))}
                       </div>
                        {exercises.map((exercise) => {
                            return (
                                <div key={exercise.id} className="my-exercises-single-exercise">
                                    { showEditExercise !== exercise.id ?
                                        <div className="single-exercise-name">{exercise.name}</div>
                                    :
                                        <form onSubmit={e => handleEditSubmit(e, exercise.id)} className="single-exercise-name">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                maxLength="50"
                                                placeholder={`${exercise.name}`}
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                            <button type="submit">Submit</button>
                                        </form>
                                    }
                                    <div className="single-exercise-buttons-container">
                                        <FontAwesomeIcon icon={faEdit} onClick={() => toggleEditExercise(exercise.id)} className="single-exercise-button"/>
                                        <FontAwesomeIcon icon={faXmark} onClick={toggleDelete} className="single-exercise-button"/>
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
