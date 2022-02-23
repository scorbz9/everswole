import React, { useState } from "react";

import { useSelector } from "react-redux";

import EditSplitForm from "./EditSplitForm";
import SingleSplitDay from "./SingleSplitDay";

import './SingleSplit.css'

const SingleSplit = ({ showMain, setShowMain }) => {
    const index = showMain.substring(11)
    const splits = useSelector(state => state.splitState.entries)
    const days = useSelector(state => state.dayState.entries)
    const currentSplit = splits[index]

    const currentSplitDays = days.filter(day => day.split_id === currentSplit.id)

    const sunday = currentSplitDays.find(day => day.assigned_day === 'sunday')
    const monday = currentSplitDays.find(day => day.assigned_day === 'monday')
    const tuesday = currentSplitDays.find(day => day.assigned_day === 'tuesday')
    const wednesday = currentSplitDays.find(day => day.assigned_day === 'wednesday')
    const thursday = currentSplitDays.find(day => day.assigned_day === 'thursday')
    const friday = currentSplitDays.find(day => day.assigned_day === 'friday')
    const saturday = currentSplitDays.find(day => day.assigned_day === 'saturday')

    const [showEditForm, setShowEditForm] = useState(false)

    const toggleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    if (!showEditForm) {
        return (
            <div className="single-split-container">
                <h2 className="single-split-header">{currentSplit.start_date}</h2>
                <SingleSplitDay day={sunday} dayOfWeek={"Sunday"} setShowMain={setShowMain} />
                <SingleSplitDay day={monday} dayOfWeek={"Monday"} setShowMain={setShowMain} />
                <SingleSplitDay day={tuesday} dayOfWeek={"Tuesday"} setShowMain={setShowMain} />
                <SingleSplitDay day={wednesday} dayOfWeek={"Wednesday"} setShowMain={setShowMain} />
                <SingleSplitDay day={thursday} dayOfWeek={"Thursday"} setShowMain={setShowMain} />
                <SingleSplitDay day={friday} dayOfWeek={"Friday"} setShowMain={setShowMain} />
                <SingleSplitDay day={saturday} dayOfWeek={"Saturday"} setShowMain={setShowMain} />
            </div>
        )
    } else {
        return (
            <EditSplitForm currentSplit={currentSplit} toggleEdit={toggleEdit} setShowMain={setShowMain}/>
        )
    }

}

export default SingleSplit
