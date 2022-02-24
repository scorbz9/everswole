import React , { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

// Store imports
import { addOneDay } from "../../../../store/day";

import './AddDayForm.css'

const AddDayForm = ({ setShowMain, setShowAddMessage }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)
    const exercises = useSelector(state => state.exerciseState.entries)

    const [name, setName] = useState("");
    const [workoutInputList, setWorkoutInputList] = useState([{ name: 'Flat Bench', goal: ''}])
    const [errors, setErrors] = useState([])

    const updateWorkoutInputListName = (e, index) => {
        const value = e.target.value
        const list = [...workoutInputList]

        list[index].name = value

        setWorkoutInputList(list);
    }

    const updateWorkoutInputListGoal = (e, index) => {
        const value = e.target.value
        const list = [...workoutInputList]

        list[index].goal = value

        setWorkoutInputList(list);

    }

    const handleRemoveWorkoutInput = index => {
        const list = [...workoutInputList]
        list.splice(index, 1)
        setWorkoutInputList(list)
    }

    const handleAddWorkoutInput = () => {
        setWorkoutInputList([...workoutInputList, { name: "Flat Bench", goal: "" }])
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const payload = {
            name,
            userId,
            workoutInputList
        }

        const data = await dispatch(addOneDay(payload, userId))

        if (data.errors) {
            setErrors([...data.errors])
        } else {
            setErrors([])

            // Send confirmation message
            setShowAddMessage(true)
            setTimeout(() => {
                setShowAddMessage(false)
            }, 3500);

            setShowMain("Home")
        }
    }

    return (
        <div className="add-day-form-container">
            <h2 className="add-day-form-header">Create your day's workout</h2>
            <div className="add-day-error-container">
                {errors.map((error, ind) => (
                    <div key={ind} className="add-day-form-error">{error}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="add-day-form">
                <label htmlFor='name' className="add-day-form-element add-day-form-label"> *Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name="name"
                        className="add-day-form-input add-day-form-name"
                        autoComplete="off"
                    />

                {workoutInputList.map((input, index) => {
                    return (
                        <div key={index} className="add-day-form-element">
                            <label htmlFor="workoutName" className="add-day-form-label"> {`Exercise ${index + 1}`}</label>
                                <select
                                    name="workoutName"
                                    value={input.name}
                                    onChange={e => updateWorkoutInputListName(e, index)}
                                    placeholder={`Exercise #${index + 1}`}
                                    className="add-day-form-input"
                                >
                                    {exercises.map((exercise, i) => {
                                        return (
                                            <option key={i} value={exercise.name}>{exercise.name}</option>
                                        )
                                    })}
                                </select>
                                <label className="add-day-form-label add-day-form-goal"> Goal</label>
                                    <input
                                        type="text"
                                        value={input.goal}
                                        onChange={e => updateWorkoutInputListGoal(e, index)}
                                        placeholder="sets x reps x weight"
                                        className="add-day-form-input"
                                    />

                                { index !== 0 &&
                                    <FontAwesomeIcon onClick={() => handleRemoveWorkoutInput(index)} icon={faXmark} />
                                }

                        </div>
                    )

                })}
                { workoutInputList.length === 9 ?
                                <div className="add-day-form-add-workout-message">Maximum number of workouts reached!</div>
                                : <div onClick={handleAddWorkoutInput} className="add-day-form-add-workout">
                                    <FontAwesomeIcon className="add-workout-plus" icon={faPlus}/> Add an exercise!
                                </div>
                            }
                <button className="add-day-form-submit" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddDayForm;
