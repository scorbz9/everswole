// React imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

// State imports
import { editOneDay, deleteOneDay } from "../../../../../store/day";

// Component imports
import ConfirmDelete from "../../ConfirmDelete";

import './EditDayForm.css'

const EditDayForm = ({ setShowMain, currentDay, toggleEdit, setShowEditMessage, setShowDeleteMessage }) => {
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exerciseState.entries)
    const userId = useSelector(state => state.session.user.id)

    // Parse currentDay info into a state usable by 'workoutInputList'
    const currentExerciseInfo = currentDay?.exercises.map((exercise) => {
        return {
            id: exercise.id,
            exercise_id: exercise.exercise_id,
            name: exercise.name,
            goal: exercise.goal,
            actual: exercise.actual,
            notes: exercise.notes,
        }
    })

    // Form state variables
    const [name, setName] = useState("")
    const [workoutInputList, setWorkoutInputList] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setName(currentDay?.name)
        setWorkoutInputList(currentExerciseInfo)
    }, [currentDay])

    const updateWorkoutInputListName = (e, index) => {
        const value = e.target.value

        const list = [...workoutInputList]

        if (e.target.name === 'exercise-name') {
            list[index].name = value

            let newExerciseId = exercises.find(exercise => exercise.name === value).id
            list[index].exercise_id = newExerciseId

        } else if (e.target.name === 'exercise-goal') {
            list[index].goal = value
        } else if (e.target.name === 'exercise-actual') {
            list[index].actual = value
        } else if (e.target.name === 'exercise-notes') {
            list[index].notes = value
        }

        setWorkoutInputList(list);
    }

    const handleRemoveWorkoutInput = index => {
        const list = [...workoutInputList]
        list.splice(index, 1)

        setWorkoutInputList(list)
    }

    const handleAddWorkoutInput = () => {
        setWorkoutInputList([...workoutInputList, { exercise_id: 1, name: "Flat Bench", goal: "", actual: "", notes: "" }])
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            userId,
            workoutInputList
        }

        const data = await dispatch(editOneDay(payload, userId, currentDay.id));

        if (data.errors) {
            setErrors([...data.errors])
        } else {
            setErrors([])

            // Send successful edit confirmation message
            setShowEditMessage(true)
            setTimeout(() => {
                setShowEditMessage(false)
            }, 4000);

            toggleEdit()
        }
    }


    const handleDeleteDay = async e => {
        e.preventDefault();

        await dispatch(deleteOneDay(userId, currentDay.id))

        // Successful delete confirmation message
        setShowDeleteMessage(true)
        setTimeout(() => {
            setShowDeleteMessage(false)
        }, 4000)

        setShowMain("Home")
    }

    // Shows delete confirmation popup
    const [showDelete, setShowDelete] = useState(false)

    const toggleDelete = (e) => {
        e.preventDefault();

        setShowDelete(!showDelete)
    }

    return (
        <div className="edit-day-form-container main-content-container">
            {showDelete ? <ConfirmDelete typeOfDelete={"day"} handleDeleteDay={handleDeleteDay} toggleDelete={toggleDelete} /> : <></>}
                <div className="single-day-info-container">
                    <form onSubmit={handleEditSubmit}>
                        <h2 className="edit-day-form-header">
                            <label className="edit-day-form-name-label"> *Name:
                            </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    autoComplete="off"
                                    maxLength="50"
                                    className="edit-day-form-input edit-day-form-input-name"
                                />
                        </h2>
                        <div className="add-day-error-container">
                            {errors.map((error, ind) => (
                                <div key={ind} className="add-day-form-error">{error}</div>
                            ))}
                        </div>
                        <div className="single-day-edit-button" onClick={toggleEdit}>
                            Edit
                        </div>
                        {workoutInputList?.map((exercise, i) => {
                            return (
                                <div key={i} className="single-day-edit-exercise-container">
                                    <div className="edit-day-form-label">{`Exercise #${i + 1}:`}</div>

                                        <select
                                            name="exercise-name"
                                            value={exercise.name}
                                            onChange={e => updateWorkoutInputListName(e, i)}
                                            placeholder={`Exercise #${i + 1}`}
                                            className="edit-day-form-input edit-day-form-exercise-name"
                                        >
                                            {exercises.map((exercise, i) => {
                                                return (
                                                    <option key={i} value={exercise.name}>{exercise.name}</option>
                                                )
                                            })}
                                        </select>

                                        <strong className="edit-day-form-label">Goal: </strong>
                                        <input
                                            name="exercise-goal"
                                            type="text"
                                            value={exercise.goal}
                                            onChange={e => updateWorkoutInputListName(e, i)}
                                            placeholder="sets x reps x weight"
                                            autoComplete="off"
                                            maxLength="30"
                                            className="edit-day-form-input"
                                        />

                                        <strong className="edit-day-form-label">Actual: </strong>
                                        <input
                                            type="text"
                                            name="exercise-actual"
                                            value={exercise.actual}
                                            onChange={e => updateWorkoutInputListName(e, i)}
                                            placeholder="Actual"
                                            autoComplete="off"
                                            maxLength="30"
                                            className="edit-day-form-input"
                                        />

                                        <strong className="edit-day-form-label">Notes: </strong>
                                        <textarea
                                            name="exercise-notes"
                                            value={exercise.notes}
                                            onChange={e => updateWorkoutInputListName(e, i)}
                                            placeholder="Notes"
                                            autoComplete="off"
                                            maxLength="500"
                                            className="edit-day-form-input edit-day-form-notes"

                                        />
                                    { i !== 0 &&
                                        <FontAwesomeIcon onClick={() => handleRemoveWorkoutInput(i)} icon={faXmark} className="edit-day-form-delete-workout"/>
                                    }
                                </div>
                            )
                        })}
                        { workoutInputList?.length === 9 ?
                                <div className="edit-day-form-add-workout-message">Maximum number of workouts reached!</div>
                                : <div onClick={handleAddWorkoutInput} className="edit-day-form-add-workout">
                                    <FontAwesomeIcon className="add-workout-plus" icon={faPlus}/> Add an exercise!
                                </div>
                            }
                        <button className="edit-day-form-submit" type="submit">Submit</button>
                        <button className="edit-day-form-delete-day" onClick={toggleDelete}>Delete Day</button>
                    </form>
                </div>
            </div>
    )
}

export default EditDayForm
