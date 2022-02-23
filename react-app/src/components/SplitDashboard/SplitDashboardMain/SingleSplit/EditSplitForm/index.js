import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Component imports
import EditSplitSingleDay from "./EditSplitSingleDay";

// Store Imports
import { deleteOneSplit } from "../../../../../store/split";

import './EditSplitForm.css'


const EditSplitForm = ({ currentSplit, toggleEdit, setShowMain, start, end }) => {
    const dispatch = useDispatch();

    const days = useSelector(state => state.dayState.entries)
    let unassignedDays = days.filter(day => !day.assigned)
    const userId = useSelector(state => state.session.user.id)

    const currentSplitDays = days.filter(day => day.split_id === currentSplit.id)
    unassignedDays = [...unassignedDays, ...currentSplitDays]
    console.log(unassignedDays)
    const [name, setName] = useState("")
    const [sunday, setSunday] = useState("")
    const [monday, setMonday] = useState("")
    const [tuesday, setTuesday] = useState("")
    const [wednesday, setWednesday] = useState("")
    const [thursday, setThursday] = useState("")
    const [friday, setFriday] = useState("")
    const [saturday, setSaturday] = useState("")
    const [errors, setErrors] = useState([])

    const [selected, setSelected] = useState({ sunday: "", monday: "" , tuesday: "", wednesday: "", thursday: "" , friday: "" , saturday: "" })

    const handleDayChange = (e, day) => {
        if (day === 'sunday') {
            setSunday(e.target.value)
        } else if (day === 'monday') {
            setMonday(e.target.value)
        } else if (day === 'tuesday') {
            setTuesday(e.target.value)
        } else if (day === 'wednesday') {
            setWednesday(e.target.value)
        } else if (day === 'thursday') {
            setThursday(e.target.value)
        } else if (day === 'friday') {
            setFriday(e.target.value)
        } else if (day === 'saturday') {
            setSaturday(e.target.value)
        } else if (day === "" || day === undefined) {

        }

        const list = { ...selected }
        console.log(list, list[day])

        list[day] = e.target.value
        setSelected(list)
        console.log(selected, Object.values(selected))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            days: [
                { sunday: sunday },
                { monday: monday },
                { tuesday: tuesday },
                { wednesday: wednesday },
                { thursday: thursday },
                { friday: friday },
                { satuday: saturday },
            ]
        }

        console.log(payload)
        // const data = await dispatch(addOneSplit(payload, userId))

        // if (data.errors) {
        //     setErrors([...data.errors])
        // } else {
        //     setErrors([])

        //     // Update day state to cause re-render on new split submit
        //     await dispatch(getAllDays(userId))
        // }
    }

    const handleDeleteSplit = async (e) => {
        e.preventDefault();

        // const data = await dispatch(deleteOneSplit(userId, currentSplit.id))
        setShowMain("Home")
    }

    return (
        <div className="edit-split-form-container">
            <form onSubmit={handleSubmit}>
                <div className="single-split-header">
                    <label htmlFor="name">
                        <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Name"
                            className="add-split-form-name"
                        />
                    </label>
                    <div className="single-split-date-range">{start} - {end}</div>
                    <div className="single-split-edit-button" onClick={toggleEdit}>
                        Edit
                    </div>
                    <button className="edit-split-form-delete-split" onClick={handleDeleteSplit}>Delete Split</button>
                </div>
                <div className="add-day-error-container">
                    {errors.map((error, ind) => (
                        <div key={ind} className="add-day-form-error">{error}</div>
                    ))}
                </div>
                <EditSplitSingleDay day={sunday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Sunday"} selected={selected}/>
                <EditSplitSingleDay day={monday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Monday"} selected={selected}/>
                <EditSplitSingleDay day={tuesday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Tuesday"} selected={selected}/>
                <EditSplitSingleDay day={wednesday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Wednesday"} selected={selected}/>
                <EditSplitSingleDay day={thursday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Thursday"} selected={selected}/>
                <EditSplitSingleDay day={friday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Friday"} selected={selected}/>
                <EditSplitSingleDay day={saturday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Saturday"} selected={selected}/>
            </form>
        </div>
    )
}

export default EditSplitForm
