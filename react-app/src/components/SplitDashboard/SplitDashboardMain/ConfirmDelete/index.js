import React from "react";

import './ConfirmDelete.css'

const ConfirmDelete = ({ typeOfDelete, handleDeleteDay, handleDeleteSplit, handleDeleteExercise, toggleDelete, showDelete, setShowDelete }) => {



    return (
        <div className="overlay-wrapper">
            <div className="confirm-delete-container">
                <p className="confirm-delete-text">
                    Are you sure you'd like to delete this {typeOfDelete}?
                </p>
                <div className="confirm-delete-button-container">
                    <button className="confirm-delete-button"
                        onClick={typeOfDelete === 'split' ? handleDeleteSplit
                            : typeOfDelete === "exercise" ? e => handleDeleteExercise(e, showDelete)
                            : handleDeleteDay }
                    >
                            Delete {typeOfDelete[0].toUpperCase() + typeOfDelete.slice(1)}
                    </button>
                    <button className="confirm-delete-cancel" onClick={() => setShowDelete(null)} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;
