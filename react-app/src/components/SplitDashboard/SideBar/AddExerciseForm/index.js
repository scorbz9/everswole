import React, { useState, useEffect, useRef } from "react";

import './AddExerciseForm.css'

const AddExerciseForm = ({ showAddExerciseForm, setShowAddExerciseForm }) => {
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();


        const payload = {
            name,
        }

        console.log(payload)
        // const data = await addOneExercise(payload)
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
                            <form onSubmit={handleSubmit} className="add-exercise-form">
                                <label id="add-exercise-form-name-label" htmlFor="add-exercise-form-name-input">
                                    Exercise Name
                                <input
                                    type="text"
                                    autoComplete="off"
                                    id="add-exercise-form-name-input"
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
