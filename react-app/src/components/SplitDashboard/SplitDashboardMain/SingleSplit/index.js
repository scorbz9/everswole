import React, { useState } from "react";

import { useSelector } from "react-redux";

import EditSplitForm from "./EditSplitForm";

import './SingleSplit.css'

const SingleSplit = ({ showMain, setShowMain }) => {
    const index = showMain.substring(11)
    const splits = useSelector(state => state.splitState.entries)

    const currentSplit = splits[index]

    const [showEditForm, setShowEditForm] = useState(false)

    const toggleEdit = () => {
        setShowEditForm(!showEditForm)
    }

    console.log(currentSplit)

    if (!showEditForm) {
        return (
            <div className="single-split-container">
                <h2 className="single-split-header">{currentSplit.start_date}</h2>
                <div className="single-split-edit-button" onClick={toggleEdit}>
                    Edit
                </div>
                <div className="single-split-day">

                </div>
                <div className="single-split-day">

                </div>
                <div className="single-split-day">

                </div>
                <div className="single-split-day">

                </div>
                <div className="single-split-day">

                </div>
                <div className="single-split-day">

                </div>
                <div className="single-split-day">

                </div>
            </div>
        )
    } else {
        return (
            <EditSplitForm currentSplit={currentSplit} toggleEdit={toggleEdit} setShowMain={setShowMain}/>
        )
    }

}

export default SingleSplit
