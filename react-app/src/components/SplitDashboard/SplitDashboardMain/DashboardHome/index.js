import React, { useState } from "react";
import { useSelector } from "react-redux";

import { parseDate } from "../../../utils";

import SingleSplitDay from "../SingleSplit/SingleSplitDay";
import EditSplitForm from "../SingleSplit/EditSplitForm";

import './DashboardHome.css'

const DashboardHome = ({ setShowMain, setShowEditMessage, setShowDeleteMessage }) => {
    const splits = useSelector(state => state.splitState.entries)
    const days = useSelector(state => state.dayState.entries)


    // Load split for current date range
    const currentSplit = splits?.find(split => {
        console.log(split.start_date, split.end_date, new Date())
        return new Date(split.start_date).getTime() <= new Date().getTime() && new Date(split.end_date).getTime() >= new Date().getTime()
    })

    const currentSplitDays = days.filter(day => day.split_id === currentSplit?.id)

    const dayOne = currentSplitDays?.find(day => day.assigned_day === 'dayOne')
    const dayTwo = currentSplitDays?.find(day => day.assigned_day === 'dayTwo')
    const dayThree = currentSplitDays?.find(day => day.assigned_day === 'dayThree')
    const dayFour = currentSplitDays?.find(day => day.assigned_day === 'dayFour')
    const dayFive = currentSplitDays?.find(day => day.assigned_day === 'dayFive')
    const daySix = currentSplitDays?.find(day => day.assigned_day === 'daySix')
    const daySeven = currentSplitDays?.find(day => day.assigned_day === 'daySeven')

    const [showEditForm, setShowEditForm] = useState(false)

    const toggleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    const startDate = new Date(currentSplit?.start_date);
    const endDate = new Date(currentSplit?.end_date)

    const start = parseDate(startDate)
    const end = parseDate(endDate)

    if (!currentSplit) {
        return (
            <div className="no-split-container main-content-container">
                <div className="no-split-warning">There is no current split! <span onClick={() => setShowMain("AddSplitForm")} className="create-link">Create one now.</span></div>
            </div>
        )
    }

    if (!showEditForm) {
        return (
            <div className="single-split-container main-content-container">
                <div className="single-split-header">
                    <div>Current Split - {currentSplit?.name}</div>
                    <div className="single-split-date-range-home">{start} - {end}</div>
                    <div className="single-split-edit-button" onClick={toggleEdit}>
                        Edit
                    </div>
                </div>
                <div className='single-split-days-container'>
                    <SingleSplitDay day={dayOne} startDate={startDate} dayIndex={"0"} dayOfWeek={"dayOne"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayTwo} startDate={startDate} dayIndex={"1"} dayOfWeek={"dayTwo"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayThree} startDate={startDate} dayIndex={"2"} dayOfWeek={"dayThree"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayFour} startDate={startDate} dayIndex={"3"} dayOfWeek={"Wednesday"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayFive} startDate={startDate} dayIndex={"4"} dayOfWeek={"dayFive"} setShowMain={setShowMain} />
                    <SingleSplitDay day={daySix} startDate={startDate} dayIndex={"5"} dayOfWeek={"daySix"} setShowMain={setShowMain} />
                    <SingleSplitDay day={daySeven} startDate={startDate} dayIndex={"6"} dayOfWeek={"daySeven"} setShowMain={setShowMain} />
                </div>
            </div>
        )
    } else {
        return (
            <EditSplitForm
                currentSplit={currentSplit}
                toggleEdit={toggleEdit}
                setShowMain={setShowMain}
                start={start}
                end={end}
                setShowEditMessage={setShowEditMessage}
                setShowDeleteMessage={setShowDeleteMessage}
            />
        )
    }
}

export default DashboardHome
