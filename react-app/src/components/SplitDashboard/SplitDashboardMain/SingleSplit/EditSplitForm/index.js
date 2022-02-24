import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Component imports
import EditSplitSingleDay from "./EditSplitSingleDay";

// Store Imports
import { deleteOneSplit, editOneSplit } from "../../../../../store/split";

import './EditSplitForm.css'
import { getAllDays } from "../../../../../store/day";


const EditSplitForm = ({ currentSplit, toggleEdit, setShowMain, start, end }) => {
    const dispatch = useDispatch();

    const days = useSelector(state => state.dayState.entries)
    let unassignedDays = days.filter(day => !day.assigned)
    const userId = useSelector(state => state.session.user.id)

    unassignedDays = [...unassignedDays, ...currentSplit.days]

    const currentSunday = currentSplit.days.find(day => day.assigned_day === 'sunday')
    const currentMonday = currentSplit.days.find(day => day.assigned_day === 'monday')
    const currentTuesday = currentSplit.days.find(day => day.assigned_day === 'tuesday')
    const currentWednesday = currentSplit.days.find(day => day.assigned_day === 'wednesday')
    const currentThursday = currentSplit.days.find(day => day.assigned_day === 'thursday')
    const currentFriday = currentSplit.days.find(day => day.assigned_day === 'friday')
    const currentSaturday = currentSplit.days.find(day => day.assigned_day === 'saturday')

    const [name, setName] = useState(currentSplit.name)
    const [sunday, setSunday] = useState(currentSunday?.id)
    const [monday, setMonday] = useState(currentMonday?.id)
    const [tuesday, setTuesday] = useState(currentTuesday?.id)
    const [wednesday, setWednesday] = useState(currentWednesday?.id)
    const [thursday, setThursday] = useState(currentThursday?.id)
    const [friday, setFriday] = useState(currentFriday?.id)
    const [saturday, setSaturday] = useState(currentSaturday?.id)
    const [errors, setErrors] = useState([])

    const [selected, setSelected] = useState({
                                        sunday: currentSunday ? `${currentSunday.id}` : "",
                                        monday: currentMonday ? `${currentMonday.id}` : "",
                                        tuesday: currentTuesday ? `${currentTuesday.id}` : "",
                                        wednesday: currentWednesday ? `${currentWednesday.id}` : "",
                                        thursday: currentThursday ? `${currentThursday.id}` : "",
                                        friday: currentFriday ? `${currentFriday.id}` : "",
                                        saturday: currentSaturday ? `${currentSaturday.id}` : "" })

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

        list[day] = e.target.value
        setSelected(list)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get days that were unassigned during edit in order to properly update database
        const unassigned = currentSplit.days.filter(day => {
            if (Object.values(selected).includes(day.id.toString())) {
                return false;
            } else {
                return true;
            }
        })

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
            ],
            unassigned
        }
        // console.log(selected, currentSplit.days)
        // console.log(payload, unassigned)
        const data = await dispatch(editOneSplit(payload, userId, currentSplit.id))

        if (data.errors) {
            setErrors([...data.errors])
        } else {
            setErrors([])

        }
    }

    const handleDeleteSplit = async (e) => {
        e.preventDefault();

        setShowMain("Home")
        const data = await dispatch(deleteOneSplit(userId, currentSplit.id))
        await dispatch(getAllDays(userId))
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
                <div>
                    <EditSplitSingleDay day={sunday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Sunday"} selected={selected}/>
                    <EditSplitSingleDay day={monday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Monday"} selected={selected}/>
                    <EditSplitSingleDay day={tuesday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Tuesday"} selected={selected}/>
                    <EditSplitSingleDay day={wednesday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Wednesday"} selected={selected}/>
                    <EditSplitSingleDay day={thursday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Thursday"} selected={selected}/>
                    <EditSplitSingleDay day={friday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Friday"} selected={selected}/>
                    <EditSplitSingleDay day={saturday} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayOfWeek={"Saturday"} selected={selected}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditSplitForm
