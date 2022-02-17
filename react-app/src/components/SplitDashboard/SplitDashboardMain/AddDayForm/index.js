import React , { useState } from "react";
import { useDispatch } from "react-redux";

import './AddDayForm.css'

const AddDayForm = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [workoutInputList, setWorkoutInputList] = useState([""])

    const updateWorkoutInputList = (e, index) => {
        const name = e.target.value;
        const list = [...workoutInputList]
        list[index] = name
        setWorkoutInputList(list);
    }

    const handleSubmit = e => {
        e.preventDefault()

        const payload = {

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
                        <label htmlFor="workoutName" key={index}> {`Workout ${index + 1}`}
                            <input
                                type="text"
                                name="workoutName"
                                value={input}
                                onChange={e => updateWorkoutInputList(e, index)}
                                placeholder={`Workout #${index + 1}`}
                            />
                        </label>
                    )
                })}
            </form>
        </div>
    )
}

export default AddDayForm;
