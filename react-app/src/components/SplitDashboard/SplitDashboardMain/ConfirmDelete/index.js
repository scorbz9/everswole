import React from "react";

const ConfirmDelete = ({ typeOfDelete, handleDeleteDay, toggleDelete }) => {



    return (

        <div className="confirm-delete-container">
            <p className="confirm-delete-text">
                Are you sure you'd like to delete this {typeOfDelete}?
            </p>
            <button className="confirm-delete-button" onClick={handleDeleteDay}>Delete {typeOfDelete[0].toUpperCase() + typeOfDelete.slice(1)}</button>
            <button className="confirm-delete-cancel" onClick={toggleDelete}>Cancel</button>
        </div>
    )
}

export default ConfirmDelete
