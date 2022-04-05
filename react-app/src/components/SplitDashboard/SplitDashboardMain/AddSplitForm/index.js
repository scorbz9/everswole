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

const AddSplitForm = ({ showMain, setShowMain, setShowAddMessage }) => {
    const dispatch = useDispatch()

    const days = useSelector(state => state.dayState.entries)
    const unassignedDays = days.filter(day => !day.assigned)
    const userId = useSelector(state => state.session.user.id)

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
                {/* <label className="add-split-name-label" htmlFor="name"> *Name:
                </label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        className="add-split-form-name"
                    /> */}
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
                    <div className="add-split-form-day add-split-form-dayOne">

                        <h4>{weekdays[startDate.getDay()]}</h4>
                        <select
                            value={dayOne}
                            onChange={e => handleDayChange(e, 'dayOne')}
                            name="dayOne"
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
                    <div className="add-split-form-day add-split-form-dayTwo">
                        <h4>{weekdays[(startDate.getDay() + 1) % 7]}</h4>
                        <select
                            value={dayTwo}
                            onChange={e =>  handleDayChange(e, 'dayTwo')}
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
                    <div className="add-split-form-day add-split-form-dayThree">
                        <h4>{weekdays[(startDate.getDay() + 2) % 7]}</h4>
                        <select
                            value={dayThree}
                            onChange={e => handleDayChange(e, 'dayThree')}
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
                    <div className="add-split-form-day add-split-form-dayFour">
                        <h4>{weekdays[(startDate.getDay() + 3) % 7]}</h4>
                        <select
                            value={dayFour}
                            onChange={e =>  handleDayChange(e, 'dayFour')}
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
                    <div className="add-split-form-day add-split-form-dayFive">
                        <h4>{weekdays[(startDate.getDay() + 4) % 7]}</h4>
                        <select
                            value={dayFive}
                            onChange={e =>  handleDayChange(e, 'dayFive')}
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
                    <div className="add-split-form-day add-split-form-daySix">
                        <h4>{weekdays[(startDate.getDay() + 5) % 7]}</h4>
                        <select
                            value={daySix}
                            onChange={e =>  handleDayChange(e, 'daySix')}
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
                    <div className="add-split-form-day add-split-form-daySeven">
                        <h4>{weekdays[(startDate.getDay() + 6) % 7]}</h4>
                        <select
                            value={daySeven}
                            onChange={e =>  handleDayChange(e, 'daySeven')}
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
