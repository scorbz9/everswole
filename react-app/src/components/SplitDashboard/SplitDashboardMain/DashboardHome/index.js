import React, { useState } from "react";
import { useSelector } from "react-redux";

import SingleSplitDay from "../SingleSplit/SingleSplitDay";
import EditSplitForm from "../SingleSplit/EditSplitForm";

import './DashboardHome.css'

const DashboardHome = ({ setShowMain, setShowEditMessage, setShowDeleteMessage }) => {
    const splits = useSelector(state => state.splitState.entries)
    const days = useSelector(state => state.dayState.entries)

    // Load most recently created split
    const currentSplit = splits[0]

    const currentSplitDays = days.filter(day => day.split_id === currentSplit?.id)

    const sunday = currentSplitDays?.find(day => day.assigned_day === 'sunday')
    const monday = currentSplitDays?.find(day => day.assigned_day === 'monday')
    const tuesday = currentSplitDays?.find(day => day.assigned_day === 'tuesday')
    const wednesday = currentSplitDays?.find(day => day.assigned_day === 'wednesday')
    const thursday = currentSplitDays?.find(day => day.assigned_day === 'thursday')
    const friday = currentSplitDays?.find(day => day.assigned_day === 'friday')
    const saturday = currentSplitDays?.find(day => day.assigned_day === 'saturday')

    const [showEditForm, setShowEditForm] = useState(false)

    const toggleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    // Parse datetime obj for header display
    const parseDate = datetime => {
        let month = datetime.getMonth() + 1
        let day = datetime.getDate()
        let year = datetime.getFullYear()

        return month + "/" + day + "/" + year;
    }

    let temp = new Date(currentSplit?.start_date)
    let startDate = new Date(currentSplit?.start_date)
    let endDate = new Date(new Date(currentSplit?.start_date).setDate(temp.getDate() + 6))

    let start = parseDate(startDate)
    let end = parseDate(endDate)

    if (!currentSplit) {
        return (
            <div className="no-split-container">

                <div className="no-split-warning">There are no splits! <span onClick={() => setShowMain("AddSplitForm")} className="create-link">Create one now.</span></div>

            </div>
        )
    }

    if (!showEditForm) {
        return (
            <div className="single-split-container">
                <div className="single-split-header">
                    <div>{currentSplit?.name}</div>
                    <div className="single-split-date-range">{start} - {end}</div>
                    <div className="single-split-edit-button" onClick={toggleEdit}>
                        Edit
                    </div>
                </div>
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
