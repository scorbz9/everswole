// React/Redux imports
import React, { useState } from "react";
import { useSelector } from "react-redux";

// Util imports
import { parseDate } from "../../../utils";

// Component imports
import EditSplitForm from "./EditSplitForm";
import SingleSplitDay from "./SingleSplitDay";

import './SingleSplit.css'

const SingleSplit = ({ showMain, setShowMain, setShowEditMessage, setShowDeleteMessage }) => {
    const index = showMain.substring(11)
    const splits = useSelector(state => state.splitState.entries)
    const days = useSelector(state => state.dayState.entries)
    const currentSplit = splits[index]

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

    if (!showEditForm) {
        return (
            <div className="single-split-container main-content-container">
                <div className="single-split-header">
                    <div>{currentSplit?.name}</div>
                    <div className="single-split-date-range">{start} - {end}</div>
                    <div className="single-split-edit-button" onClick={toggleEdit}>
                        Edit
                    </div>
                </div>
                <div className="single-split-days-container">
                    <SingleSplitDay day={dayOne} startDate={startDate} dayIndex={"0"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayTwo} startDate={startDate} dayIndex={"1"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayThree} startDate={startDate} dayIndex={"2"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayFour} startDate={startDate} dayIndex={"3"} setShowMain={setShowMain} />
                    <SingleSplitDay day={dayFive} startDate={startDate} dayIndex={"4"} setShowMain={setShowMain} />
                    <SingleSplitDay day={daySix} startDate={startDate} dayIndex={"5"} setShowMain={setShowMain} />
                    <SingleSplitDay day={daySeven} startDate={startDate} dayIndex={"6"} setShowMain={setShowMain} />
                </div>
            </div>
        )
    } else {
        return (
            <EditSplitForm
                currentSplit={currentSplit}
                toggleEdit={toggleEdit}
                setShowMain={setShowMain}
                setShowEditMessage={setShowEditMessage}
                setShowDeleteMessage={setShowDeleteMessage}
            />
        )
    }

}

export default SingleSplit
