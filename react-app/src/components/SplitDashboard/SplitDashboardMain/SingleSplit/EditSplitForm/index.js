import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Store Imports
import { deleteOneSplit } from "../../../../../store/split";

import './EditSplitForm.css'


const EditSplitForm = ({ currentSplit, toggleEdit, setShowMain }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)


    const handleDeleteSplit = async (e) => {
        e.preventDefault();

        // const data = await dispatch(deleteOneSplit(userId, currentSplit.id))
        setShowMain("Home")
    }

    return (
        <div className="edit-split-form-container">
            <form>

            <h2 className="single-split-header">{currentSplit.start_date}</h2>
                <div className="single-split-edit-button" onClick={toggleEdit}>
                    Edit
                </div>
                <div className="single-split-edit-form-day">

                </div>
                <div className="single-split-edit-form-day">

                </div>
                <div className="single-split-edit-form-day">

                </div>
                <div className="single-split-edit-form-day">

                </div>
                <div className="single-split-edit-form-day">

                </div>
                <div className="single-split-edit-form-day">

                </div>
                <div className="single-split-edit-form-day">

                </div>
                <button className="edit day-form-delete-day" onClick={handleDeleteSplit}>Delete Split</button>
            </form>
        </div>
    )
}

export default EditSplitForm
