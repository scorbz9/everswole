import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

import './EditDayForm.css'

const EditDayForm = ({ currentDay, toggleEdit }) => {
    const exercises = useSelector(state => state.exerciseState.entries)

    // Parse currentDay info into a state usable by 'workoutInputList'
    const currentExerciseInfo = currentDay.exercises.map((exercise) => {
        return {
            name: exercise.name,
            goal: exercise.goal,
            actual: exercise.actual,
            notes: exercise.notes
        }
    })

    const [name, setName] = useState("")
    const [workoutInputList, setWorkoutInputList] = useState([])

    useEffect(() => {
        setName(currentDay.name)
        setWorkoutInputList(currentExerciseInfo)
    }, [currentDay])

    const updateWorkoutInputListName = (e, index) => {
        const value = e.target.value

        const list = [...workoutInputList]

        if (e.target.name === 'exercise-name') {
            list[index].name = value
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
        setWorkoutInputList([...workoutInputList, { name: "Flat Bench", goal: "", actual: "", notes: "" }])
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name,
            workoutInputList
        }

        console.log(payload)
    }

    return (
        <div className="edit-day-form-container">
                <div className="single-day-info-container">
                    <form onSubmit={handleEditSubmit}>
                        <h2 className="edit-day-form-header">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="edit-day-form-input edit-day-form-input-name"
                            />
                        </h2>
                        <div className="single-day-edit-button" onClick={toggleEdit}>
                            Edit
                        </div>
                        {workoutInputList.map((exercise, i) => {
                            return (
                                <div key={i} className="single-day-exercise-container">
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

                                        <input
                                            name="exercise-goal"
                                            type="text"
                                            value={exercise.goal}
                                            onChange={e => updateWorkoutInputListName(e, i)}
                                            placeholder="Goal"
                                            className="edit-day-form-input"
                                        />


                                        <input
                                            type="text"
                                            name="exercise-actual"
                                            value={exercise.actual}
                                            onChange={e => updateWorkoutInputListName(e, i)}
                                            placeholder="Actual"
                                            className="edit-day-form-input"
                                        />

                                        <textarea
                                            name="exercise-notes"
                                            value={exercise.notes}
                                            onChange={e => updateWorkoutInputListName(e, i)}
                                            placeholder="Notes"
                                            className="edit-day-form-input edit-day-form-notes"

                                        />
                                    { i !== 0 &&
                                        <FontAwesomeIcon onClick={() => handleRemoveWorkoutInput(i)} icon={faXmark} className="edit-day-form-delete-workout"/>
                                    }
                                </div>
                            )
                        })}
                        { workoutInputList.length === 9 ?
                                <div className="edit-day-form-add-workout-message">Maximum number of workouts reached!</div>
                                : <div onClick={handleAddWorkoutInput} className="edit-day-form-add-workout">
                                    <FontAwesomeIcon className="add-workout-plus" icon={faPlus}/> Add an exercise!
                                </div>
                            }
                        <button className="edit-day-form-submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
    )
}

export default EditDayForm
