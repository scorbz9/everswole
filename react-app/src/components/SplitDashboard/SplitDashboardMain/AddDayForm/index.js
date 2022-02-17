import React , { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import './AddDayForm.css'

const AddDayForm = () => {
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exerciseState.entries)

    const [name, setName] = useState("");
    const [workoutInputList, setWorkoutInputList] = useState(["Flat Bench"])

    const updateWorkoutInputList = (e, index) => {
        const name = e.target.value;
        const list = [...workoutInputList]
        list[index] = name
        setWorkoutInputList(list);
    }

    const handleRemoveWorkoutInput = index => {
        const list = [...workoutInputList]
        list.splice(index, 1)
        setWorkoutInputList(list)
    }

    const handleAddWorkoutInput = () => {
        setWorkoutInputList([...workoutInputList, "Flat Bench"])
    }

    const handleSubmit = e => {
        e.preventDefault()

        const payload = {
            name,
            workoutInputList
        }

        console.log(payload)

        // temp thunk action until its written
        // await dispatch(temp(payload))
    }

    return (
        <div className="add-day-form-container">
            <form onSubmit={handleSubmit} className="add-day-form">
                <label htmlFor='name'> Name
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name="name"
                    placeholder="Name"
                    autoComplete="off"
                />
                </label>
                {workoutInputList.map((input, index) => {
                    return (
                        <>
                            <label htmlFor="workoutName" key={index}> {`Workout ${index + 1}`}
                                <select
                                    name="workoutName"
                                    value={input}
                                    onChange={e => updateWorkoutInputList(e, index)}
                                    placeholder={`Workout #${index + 1}`}
                                >
                                    {exercises.map(exercise => {
                                        return (
                                            <option value={exercise.name}>{exercise.name}</option>
                                        )
                                    })}
                                </select>
                                <label> Goal
                                    <input
                                        type="text"
                                        placeholder="sets x reps x weight"
                                    />
                                </label>
                                { index !== 0 &&
                                    <FontAwesomeIcon onClick={() => handleRemoveWorkoutInput(index)} icon={faXmark} />
                                }
                            </label>
                        </>
                    )

                })}
                { workoutInputList.length === 10 ?
                                <div>Maximum number of workouts reached!</div>
                                : <div onClick={handleAddWorkoutInput}>Add a workout!</div>
                            }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddDayForm;
