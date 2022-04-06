// React/Redux imports
import React from "react";
import { useSelector } from "react-redux";

import './DayDropdown.css'

const DayDropdown = ({ showDayDropdown, setShowDayDropdown, showMain, setShowMain }) => {
    const days = useSelector(state => state.dayState.entries)

    const toggleDayInfo = (index) => {
        setShowMain(`SingleDay${index}`)
    }

    return (
        <>
            {showDayDropdown ?
                <div className="sidebar-day-dropdown-content">
                    {days.map((day, index) => {
                        return (
                            <div className="sidebar-day-dropdown-element" key={index} onClick={() => toggleDayInfo(index)}>
                                {day.name}
                            </div>
                        )

                    })}

                </div>
                : <></>
            }
        </>

    )
}

export default DayDropdown
