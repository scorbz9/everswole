import React from "react";

import './ConfirmDelete.css'

const ConfirmDelete = ({ typeOfDelete, handleDeleteDay, toggleDelete }) => {



    return (

        <div className="overlay-wrapper">
            <div className="confirm-delete-container">
                <p className="confirm-delete-text">
                    Are you sure you'd like to delete this {typeOfDelete}?
                </p>
                <div className="confirm-delete-button-container">
                    <button className="confirm-delete-button" onClick={handleDeleteDay}>Delete {typeOfDelete[0].toUpperCase() + typeOfDelete.slice(1)}</button>
                    <button className="confirm-delete-cancel" onClick={toggleDelete}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete
