import React, { useState } from "react";
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from "react-redux";

// State imports
import { addOneSplit } from "../../../../store/split";
import { getAllDays } from "../../../../store/day";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import 'react-calendar/dist/Calendar.css';
import './AddSplitForm.css'
import AddSplitFormDay from "./AddSplitFormDay";

const AddSplitForm = ({ showMain, setShowMain, setShowAddMessage }) => {
    const dispatch = useDispatch()

    const days = useSelector(state => state.dayState.entries)
    const unassignedDays = days.filter(day => !day.assigned)
    const userId = useSelector(state => state.session.user.id)

    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [showCalendar, setShowCalendar] = useState(false)
    const [dayOne, setDayOne] = useState("")
    const [dayTwo, setDayTwo] = useState("")
    const [dayThree, setDayThree] = useState("")
    const [dayFour, setDayFour] = useState("")
    const [dayFive, setDayFive] = useState("")
    const [daySix, setDaySix] = useState("")
    const [daySeven, setDaySeven] = useState("")
    const [errors, setErrors] = useState([])

    const [selected, setSelected] = useState({
        dayOne: "",
        dayTwo: "" ,
        dayThree: "",
        dayFour: "",
        dayFive: "" ,
        daySix: "" ,
        daySeven: "" })

    const handleDayChange = (e, day) => {
            if (day === 'dayOne') {
                setDayOne(e.target.value)
            } else if (day === 'dayTwo') {
                setDayTwo(e.target.value)
            } else if (day === 'dayThree') {
                setDayThree(e.target.value)
            } else if (day === 'dayFour') {
                setDayFour(e.target.value)
            } else if (day === 'dayFive') {
                setDayFive(e.target.value)
            } else if (day === 'daySix') {
                setDaySix(e.target.value)
            } else if (day === 'daySeven') {
                setDaySeven(e.target.value)
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
            startDate,
            days: [
                { dayOne: dayOne },
                { dayTwo: dayTwo },
                { dayThree: dayThree },
                { dayFour: dayFour },
                { dayFive: dayFive },
                { daySix: daySix },
                { daySeven: daySeven },
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

    const toggleCalendar = (e) => {
        e.preventDefault()

        setShowCalendar(!showCalendar)
    }

    return (
        <div className="add-split-form-container main-content-container">
            <h2 className="add-split-form-header">Organize your week's workouts</h2>
            <form onSubmit={handleSubmit}>
                <div className="add-split-form-date-section">
                    <label className="add-split-name-label" htmlFor="add-split-form-calendar-toggle">*Select a start date: </label>
                    <div className="add-split-form-selected-day">
                        {startDate.toDateString()}
                    </div>
                    <button id="add-split-form-calendar-toggle" onClick={e => toggleCalendar(e)}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </button>
                    {showCalendar ?
                    <div className="add-split-form-calendar-container">
                        <Calendar returnValue={'start'} minDetail={"year"} onChange={setStartDate} value={startDate} />
                    </div> : <></>}
                </div>
                <div className="add-split-error-container">
                    {errors.map((error, ind) => (
                        <div key={ind} className="add-day-form-error">{error}</div>
                    ))}
                </div>
                <div className="add-split-form-day-container">
                    <AddSplitFormDay
                        day={dayOne}
                        dayIndex={"0"}
                        dayPosition={"dayOne"}
                        handleDayChange={handleDayChange}
                        startDate={startDate}
                        unassignedDays={unassignedDays}
                        selected={selected}
                    />
                    <AddSplitFormDay
                        day={dayTwo}
                        dayIndex={"1"}
                        dayPosition={"dayTwo"}
                        handleDayChange={handleDayChange}
                        startDate={startDate}
                        unassignedDays={unassignedDays}
                        selected={selected}
                    />
                    <AddSplitFormDay
                        day={dayThree}
                        dayIndex={"2"}
                        dayPosition={"dayThree"}
                        handleDayChange={handleDayChange}
                        startDate={startDate}
                        unassignedDays={unassignedDays}
                        selected={selected}
                    />
                    <AddSplitFormDay
                        day={dayFour}
                        dayIndex={"3"}
                        dayPosition={"dayFour"}
                        handleDayChange={handleDayChange}
                        startDate={startDate}
                        unassignedDays={unassignedDays}
                        selected={selected}
                    />
                    <AddSplitFormDay
                        day={dayFive}
                        dayIndex={"4"}
                        dayPosition={"dayFive"}
                        handleDayChange={handleDayChange}
                        startDate={startDate}
                        unassignedDays={unassignedDays}
                        selected={selected}
                    />
                    <AddSplitFormDay
                        day={daySix}
                        dayIndex={"5"}
                        dayPosition={"daySix"}
                        handleDayChange={handleDayChange}
                        startDate={startDate}
                        unassignedDays={unassignedDays}
                        selected={selected}
                    />
                    <AddSplitFormDay
                        day={daySeven}
                        dayIndex={"6"}
                        dayPosition={"daySeven"}
                        handleDayChange={handleDayChange}
                        startDate={startDate}
                        unassignedDays={unassignedDays}
                        selected={selected}
                    />
                </div>
                <button type="submit" className="edit-split-submit-button">Submit</button>
            </form>
        </div>
    )
}

export default AddSplitForm
