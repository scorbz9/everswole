// React/Redux imports
import React, { useEffect, useRef } from 'react';

// Font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDay, faDumbbell } from '@fortawesome/free-solid-svg-icons'

import './NewDropdown.css'

const NewDropdown = ({ showNewDropdown, setShowNewDropdown, toggleAddExerciseForm, showMain, setShowMain }) => {


    const toggleAddDayForm = () => {
        setShowMain('AddDayForm')
    }

    const toggleAddSplitForm = () => {
        setShowMain('AddSplitForm')
    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {

        if (showNewDropdown && ref.current && !ref.current.contains(e.target)) {
                setShowNewDropdown(false)
            }
        }

        document.addEventListener("click", checkIfClickedOutside)

        return () => {
        // Cleanup the event listener
        document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [showNewDropdown, setShowNewDropdown])


    return (
        <>
            {showNewDropdown ?
                <div className="sidebar-new-dropdown-content" ref={ref}>
                    <div className="sidebar-new-dropdown-add-day new-dropdown-element" onClick={toggleAddDayForm}>
                        <FontAwesomeIcon icon={faCalendarDay} className="new-dropdown-element-icon"/><div>Day</div>
                    </div>
                    <div className="sidebar-new-dropdown-add-split new-dropdown-element" onClick={toggleAddSplitForm}>
                        <FontAwesomeIcon icon={faCalendar} className="new-dropdown-split-icon new-dropdown-element-icon" /><div id="new-dropdown-split-text">Split</div>
                    </div>
                    <div className="sidebar-new-dropdown-add-exercise new-dropdown-element" onClick={toggleAddExerciseForm}>
                        <FontAwesomeIcon icon={faDumbbell} className="new-dropdown-exercise-icon new-dropdown-element-icon" /><div id="new-dropdown-split-text">Exercise</div>
                    </div>

            </div> : <></>}
        </>
    )
}

export default NewDropdown;
