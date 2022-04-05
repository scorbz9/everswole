// React/Redux imports
import React, { useState } from "react";
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from "react-redux";

// Component imports
import EditSplitSingleDay from "./EditSplitSingleDay";
import ConfirmDelete from "../../ConfirmDelete";

// State Imports
import { deleteOneSplit, editOneSplit } from "../../../../../store/split";
import { getAllDays } from "../../../../../store/day";

// Font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

// Util imports
import { parseDate } from "../../../../utils";

import './EditSplitForm.css'


const EditSplitForm =
    ({ currentSplit,
    toggleEdit,
    setShowMain,
    setShowEditMessage,
    setShowDeleteMessage }) => {

    const dispatch = useDispatch();

    const days = useSelector(state => state.dayState.entries)
    let unassignedDays = days?.filter(day => !day.assigned)
    const userId = useSelector(state => state.session.user.id)

    if (currentSplit) unassignedDays = [...unassignedDays, ...currentSplit.days]

    // Prepopulate state variables with current info
    const currentDayOne = currentSplit?.days.find(day => day.assigned_day === 'dayOne')
    const currentDayTwo = currentSplit?.days.find(day => day.assigned_day === 'dayTwo')
    const currentDayThree = currentSplit?.days.find(day => day.assigned_day === 'dayThree')
    const currentDayFour = currentSplit?.days.find(day => day.assigned_day === 'dayFour')
    const currentDayFive = currentSplit?.days.find(day => day.assigned_day === 'dayFive')
    const currentDaySix = currentSplit?.days.find(day => day.assigned_day === 'daySix')
    const currentDaySeven = currentSplit?.days.find(day => day.assigned_day === 'daySeven')

    // Form state variables
    const [name, setName] = useState(currentSplit?.name)
    const [startDate, setStartDate] = useState(new Date(currentSplit?.start_date))
    const [dayOne, setDayOne] = useState(currentDayOne ? currentDayOne.id : "")
    const [dayTwo, setDayTwo] = useState(currentDayTwo ? currentDayTwo.id : "")
    const [dayThree, setDayThree] = useState(currentDayThree ? currentDayThree.id : "")
    const [dayFour, setDayFour] = useState(currentDayFour ? currentDayFour.id : "")
    const [dayFive, setDayFive] = useState(currentDayFive ? currentDayFive.id : "")
    const [daySix, setDaySix] = useState(currentDaySix ? currentDaySix.id : "")
    const [daySeven, setDaySeven] = useState(currentDaySeven ? currentDaySeven : "")
    const [errors, setErrors] = useState([])

    const [selected, setSelected] = useState({
                                        dayOne: currentDayOne ? `${currentDayOne.id}` : "",
                                        dayTwo: currentDayTwo ? `${currentDayTwo.id}` : "",
                                        dayThree: currentDayThree ? `${currentDayThree.id}` : "",
                                        dayFour: currentDayFour ? `${currentDayFour.id}` : "",
                                        dayFive: currentDayFive ? `${currentDayFive.id}` : "",
                                        daySix: currentDaySix ? `${currentDaySix.id}` : "",
                                        daySeven: currentDaySeven ? `${currentDaySeven.id}` : "" })

    // Handles select dropdown changes, including keeping track of already-selected days
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

        // Get days that were unassigned during edit in order to properly update database
        const unassigned = currentSplit?.days.filter(day => {
            if (Object.values(selected).includes(day.id.toString())) {
                return false;
            } else {
                return true;
            }
        })

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
            ],
            unassigned
        }

        const data = await dispatch(editOneSplit(payload, userId, currentSplit.id))

        if (data.errors) {
            setErrors([...data.errors])
        } else {
            setErrors([])

            // Send successful edit confirmation message
            setShowEditMessage(true)
            setTimeout(() => {
                setShowEditMessage(false)
            }, 3500);

            toggleEdit()

            // Update day state to cause re-render on new split submit
            await dispatch(getAllDays(userId))
        }
    }

    const handleDeleteSplit = async (e) => {
        e.preventDefault();

        const data = await dispatch(deleteOneSplit(userId, currentSplit.id))

        // Successful delete confirmation message
        setShowDeleteMessage(true)
        setTimeout(() => {
            setShowDeleteMessage(false)
        }, 4000)

        toggleEdit()
        setShowMain("Home")

        await dispatch(getAllDays(userId))
    }

    // Shows delete confirmation popup

    const [showDelete, setShowDelete] = useState(false)

    const toggleDelete = (e) => {
        e.preventDefault();

        setShowDelete(!showDelete)
    }

    const [showCalendar, setShowCalendar] = useState(false)

    const toggleCalendar = (e) => {
        e.preventDefault()

        setShowCalendar(!showCalendar)
    }

    return (
        <div className="edit-split-form-container main-content-container">
            {showDelete ? <ConfirmDelete typeOfDelete={"split"} handleDeleteSplit={handleDeleteSplit} toggleDelete={toggleDelete} /> : <></>}
            <form onSubmit={handleSubmit}>
                <div className="single-split-header">
                    <div className="add-split-form-date-section">
                        <label className="add-split-name-label" htmlFor="add-split-form-calendar-toggle">*Edit start date: </label>
                        <div className="add-split-form-selected-day">
                            {startDate?.toDateString()}
                        </div>
                        <button id="add-split-form-calendar-toggle" onClick={e => toggleCalendar(e)}>
                            <FontAwesomeIcon icon={faCalendar} />
                        </button>
                        {showCalendar ?
                        <div className="add-split-form-calendar-container">
                            <Calendar className="edit-split-form-calendar" returnValue={'start'} minDetail={"year"} onChange={setStartDate} value={startDate} />
                        </div> : <></>}
                    </div>
                    {/* <div className="single-split-edit-date-range">{start} - {end}</div> */}
                    <div className="single-split-edit-button" onClick={toggleEdit}>
                        Edit
                    </div>
                    <button className="edit-split-form-delete-split" onClick={toggleDelete}>Delete Split</button>
                </div>
                <div className="add-split-error-container">
                    {errors.map((error, ind) => (
                        <div key={ind} className="add-split-form-error">{error}</div>
                    ))}
                </div>
                <div className="single-split-days-container"ame>
                    <EditSplitSingleDay day={dayOne} startDate={startDate} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayIndex={"0"}  dayPosition={"dayOne"} selected={selected}/>
                    <EditSplitSingleDay day={dayTwo} startDate={startDate} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayIndex={"1"} dayPosition={"dayTwo"} selected={selected}/>
                    <EditSplitSingleDay day={dayThree} startDate={startDate} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayIndex={"2"} dayPosition={"dayThree"} selected={selected}/>
                    <EditSplitSingleDay day={dayFour} startDate={startDate} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayIndex={"3"} dayPosition={"dayFour"} selected={selected}/>
                    <EditSplitSingleDay day={dayFive} startDate={startDate} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayIndex={"4"} dayPosition={"dayFive"} selected={selected}/>
                    <EditSplitSingleDay day={daySix} startDate={startDate} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayIndex={"5"} dayPosition={"daySix"} selected={selected}/>
                    <EditSplitSingleDay day={daySeven} startDate={startDate} handleDayChange={handleDayChange} unassignedDays={unassignedDays} dayIndex={"6"} dayPosition={"daySeven"} selected={selected}/>
                </div>
                <button className="edit-split-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditSplitForm
