import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// State imports
import { addOneSplit } from "../../../../store/split";
import { getAllDays } from "../../../../store/day";

import './AddSplitForm.css'

const AddSplitForm = ({ showMain, setShowMain, setShowAddMessage }) => {
    const dispatch = useDispatch()

    const days = useSelector(state => state.dayState.entries)
    const unassignedDays = days.filter(day => !day.assigned)
    const userId = useSelector(state => state.session.user.id)

    const [name, setName] = useState("")
    const [sunday, setSunday] = useState("")
    const [monday, setMonday] = useState("")
    const [tuesday, setTuesday] = useState("")
    const [wednesday, setWednesday] = useState("")
    const [thursday, setThursday] = useState("")
    const [friday, setFriday] = useState("")
    const [saturday, setSaturday] = useState("")
    const [errors, setErrors] = useState([])

    const [selected, setSelected] = useState({
        sunday: "",
        monday: "" ,
        tuesday: "",
        wednesday: "",
        thursday: "" ,
        friday: "" ,
        saturday: "" })

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

        const data = await dispatch(addOneSplit(payload, userId))

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

            // Update day state to cause re-render on new split submit
            await dispatch(getAllDays(userId))
        }
    }

    return (

        <div className="add-split-form-container">
            <h2 className="add-split-form-header">Organize your week's workouts</h2>
            <form onSubmit={handleSubmit}>
                <label className="add-split-name-label" htmlFor="name"> *Name:
                </label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        className="add-split-form-name"
                    />
                <div className="add-split-error-container">
                    {errors.map((error, ind) => (
                        <div key={ind} className="add-day-form-error">{error}</div>
                    ))}
                </div>
                <div className="add-split-form-day-container">
                    <div className="add-split-form-day add-split-form-sunday">

                        <h4>Sunday</h4>
                        <select
                            value={sunday}
                            onChange={e => handleDayChange(e, 'sunday')}
                            name="sunday"
                            className="add-split-form-day-select"
                        >
                            <option value="">Rest Day</option>
                            {unassignedDays.map((day, i) => {

                                return (
                                    <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                                        {day.name}
                                    </option>
                                )
                            })}
                        </select>

                    </div>
                    <div className="add-split-form-day add-split-form-monday">
                        <h4>Monday</h4>
                        <select
                            value={monday}
                            onChange={e =>  handleDayChange(e, 'monday')}
                            className="add-split-form-day-select"
                        >
                            <option value="">Rest Day</option>
                            {unassignedDays.map((day, i) => {
                                return (
                                    <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                                        {day.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="add-split-form-day add-split-form-tuesday">
                        <h4>Tuesday</h4>
                        <select
                            value={tuesday}
                            onChange={e => handleDayChange(e, 'tuesday')}
                            className="add-split-form-day-select"
                        >
                            <option value="">Rest Day</option>
                            {unassignedDays.map((day, i) => {
                                return (
                                    <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                                        {day.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="add-split-form-day add-split-form-wednesday">
                        <h4>Wednesday</h4>
                        <select
                            value={wednesday}
                            onChange={e =>  handleDayChange(e, 'wednesday')}
                            className="add-split-form-day-select"
                        >
                            <option value="">Rest Day</option>
                            {unassignedDays.map((day, i) => {
                                return (
                                    <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                                        {day.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="add-split-form-day add-split-form-thursday">
                        <h4>Thursday</h4>
                        <select
                            value={thursday}
                            onChange={e =>  handleDayChange(e, 'thursday')}
                            className="add-split-form-day-select"
                        >
                            <option value="">Rest Day</option>
                            {unassignedDays.map((day, i) => {
                                return (
                                    <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                                        {day.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="add-split-form-day add-split-form-friday">
                        <h4>Friday</h4>
                        <select
                            value={friday}
                            onChange={e =>  handleDayChange(e, 'friday')}
                            className="add-split-form-day-select"
                        >
                            <option value="">Rest Day</option>
                            {unassignedDays.map((day, i) => {
                                return (
                                    <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                                        {day.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="add-split-form-day add-split-form-saturday">
                        <h4>Saturday</h4>
                        <select
                            value={saturday}
                            onChange={e =>  handleDayChange(e, 'saturday')}
                            className="add-split-form-day-select"
                        >
                            <option value="">Rest Day</option>
                            {unassignedDays.map((day, i) => {
                                return (
                                    <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                                        {day.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <button type="submit" className="edit-split-submit-button">Submit</button>
            </form>
        </div>
    )
}

export default AddSplitForm
