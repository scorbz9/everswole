import React , { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Store imports
import { addOneDay } from "../../../../store/day";

import './AddDayForm.css'

const AddDayForm = () => {
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exerciseState.entries)

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("")
    const [workoutInputList, setWorkoutInputList] = useState([{ name: '', goal: ''}])

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
            workoutInputList
        }

        console.log(payload)

        await dispatch(addOneDay(payload))
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
                        <div key={index}>
                            <label htmlFor="workoutName"> {`Workout ${index + 1}`}
                                <select
                                    name="workoutName"
                                    value={input.name}
                                    onChange={e => updateWorkoutInputListName(e, index)}
                                    placeholder={`Workout #${index + 1}`}
                                >
                                    {exercises.map((exercise, i) => {
                                        return (
                                            <option key={i} value={exercise.name}>{exercise.name}</option>
                                        )
                                    })}
                                </select>
                                <label> Goal
                                    <input
                                        type="text"
                                        value={input.goal}
                                        onChange={e => updateWorkoutInputListGoal(e, index)}
                                        placeholder="sets x reps x weight"
                                    />
                                </label>
                                { index !== 0 &&
                                    <FontAwesomeIcon onClick={() => handleRemoveWorkoutInput(index)} icon={faXmark} />
                                }
                            </label>
                        </div>
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
