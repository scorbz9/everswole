import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// State imports
import { addOneSplit } from "../../../../store/split";

import './AddSplitForm.css'

const AddSplitForm = () => {
    const dispatch = useDispatch()

    const days = useSelector(state => state.dayState.entries)
    const unassignedDays = days.filter(day => !day.assigned)
    const userId = useSelector(state => state.session.user.id)

    const [sunday, setSunday] = useState("Rest Day")
    const [monday, setMonday] = useState("Rest Day")
    const [tuesday, setTuesday] = useState("Rest Day")
    const [wednesday, setWednesday] = useState("Rest Day")
    const [thursday, setThursday] = useState("Rest Day")
    const [friday, setFriday] = useState("Rest Day")
    const [saturday, setSaturday] = useState("Rest Day")

    const handleSunday = (e) => {
        setSunday(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
        }

        console.log(payload)
        const data = await dispatch(addOneSplit(payload, userId))
    }

    return (

        <div className="add-split-form-container">
            <form onSubmit={handleSubmit}>
                <div className="add-split-form-day add-split-form-sunday">
                    <h4>Sunday</h4>
                    <select
                        value={sunday}
                        onChange={e => setSunday(e.target.value)}
                        name="sunday"
                    >
                        <option value="Rest Day">Rest Day</option>
                        {unassignedDays.map((day, i) => {
                            return (
                                <option key={i} value={day.id}>
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
                        onChange={e => setMonday(e.target.value)}
                    >
                        <option value="Rest Day">Rest Day</option>
                        {unassignedDays.map((day, i) => {
                            return (
                                <option key={i} value={day.id}>
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
                        onChange={e => setTuesday(e.target.value)}
                    >
                        <option value="Rest Day">Rest Day</option>
                        {unassignedDays.map((day, i) => {
                            return (
                                <option key={i} value={day.id}>
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
                        onChange={e => setWednesday(e.target.value)}
                    >
                        <option value="Rest Day">Rest Day</option>
                        {unassignedDays.map((day, i) => {
                            return (
                                <option key={i} value={day.id}>
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
                        onChange={e => setThursday(e.target.value)}
                    >
                        <option value="Rest Day">Rest Day</option>
                        {unassignedDays.map((day, i) => {
                            return (
                                <option key={i} value={day.id}>
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
                        onChange={e => setFriday(e.target.value)}
                    >
                        <option value="Rest Day">Rest Day</option>
                        {unassignedDays.map((day, i) => {
                            return (
                                <option key={i} value={day.id}>
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
                        onChange={e => setSaturday(e.target.value)}
                    >
                        <option value="Rest Day">Rest Day</option>
                        {unassignedDays.map((day, i) => {
                            return (
                                <option key={i} value={day.id}>
                                    {day.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddSplitForm
