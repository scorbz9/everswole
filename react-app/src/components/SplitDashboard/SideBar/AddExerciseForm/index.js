// React imports
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// State imports
import { addOneExercise } from "../../../../store/exercise";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import './AddExerciseForm.css'

const AddExerciseForm = ({ showAddExerciseForm, setShowAddExerciseForm, setShowAddMessage }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            name,
            userId
        }

        const data = await dispatch(addOneExercise(payload, userId))

        if (data.errors) {
            setErrors([...data.errors])
        } else {
            setErrors([])
            setName("")

            // Send confirmation message
            setShowAddMessage(true)
            setTimeout(() => {
                setShowAddMessage(false)
            }, 3500);

            setShowAddExerciseForm(false)
        }
    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {

        if (showAddExerciseForm && ref.current && !ref.current.contains(e.target)) {
                setShowAddExerciseForm(false)
            }
        }

        document.addEventListener("click", checkIfClickedOutside)

        return () => {
        // Cleanup the event listener
        document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [showAddExerciseForm, setShowAddExerciseForm])

    return (
        <>
            {showAddExerciseForm ?
                <div className="overlay-wrapper">
                    <div className="add-exercise-form-container" ref={ref}>
                        <div className="add-exercise-form-info-container">
                            <div className="add-exercise-form-header">
                                Add a new exercise
                            </div>
                            <FontAwesomeIcon icon={faXmark} onClick={() => setShowAddExerciseForm(false)} className="cancel-help"/>
                            <div className="add-day-error-container">
                                {errors.map((error, ind) => (
                                    <div key={ind} className="add-day-form-error">{error}</div>
                                ))}
                            </div>
                            <form onSubmit={handleSubmit} className="add-exercise-form">
                                <label id="add-exercise-form-name-label" htmlFor="add-exercise-form-name-input">
                                    Exercise Name
                                <input
                                    type="text"
                                    onChange={e => setName(e.target.value)}
                                    autoComplete="off"
                                    id="add-exercise-form-name-input"
                                    value={name}
                                    maxLength="50"
                                    />
                                </label>
                                <button id="add-exercise-form-submit" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            : <></> }
        </>
    )
}

export default AddExerciseForm
