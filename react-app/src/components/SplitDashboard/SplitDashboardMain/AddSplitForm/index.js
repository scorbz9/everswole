import React, { useState } from "react";
import { useSelector } from "react-redux";

import './AddSplitForm.css'

const AddSplitForm = () => {
    const days = useSelector(state => state.dayState.entries)

    const [sunday, setSunday] = useState("")
    const [monday, setMonday] = useState("")
    const [tuesday, setTuesday] = useState("")
    const [wednesday, setWednesday] = useState("")
    const [thursday, setThursday] = useState("")
    const [friday, setFriday] = useState("")
    const [saturday, setSaturday] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday
        }

        console.log(payload)

    }

    return (

        <div className="add-split-form-container">
            <div className="add-split-form-day add-split-form-sunday">
                <h4>Sunday</h4>
                <select
                    value={sunday}
                    onChange={e => setSunday(e.target.value)}
                >
                    {days.map((day, i) => {
                        return (
                            <option key={i} value={day.name}>
                                {day.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="add-split-form-day add-split-form-monday">
                <h4>Monday</h4>
            </div>
            <div className="add-split-form-day add-split-form-tuesday">
                <h4>Tuesday</h4>
            </div>
            <div className="add-split-form-day add-split-form-wednesday">
                <h4>Wednesday</h4>
            </div>
            <div className="add-split-form-day add-split-form-thursday">
                <h4>Thursday</h4>
            </div>
            <div className="add-split-form-day add-split-form-friday">
                <h4>Friday</h4>
            </div>
            <div className="add-split-form-day add-split-form-saturday">
                <h4>Saturday</h4>
            </div>
        </div>
    )
}

export default AddSplitForm
