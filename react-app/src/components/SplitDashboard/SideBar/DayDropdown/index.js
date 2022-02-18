import React, { useState } from "react";
import { useSelector } from "react-redux";

import './DayDropdown.css'

const DayDropdown = ({ showDayDropdown, setShowDayDropdown}) => {
    const days = useSelector(state => state.dayState.entries)
    console.log(days)
    return (
        <>
            {showDayDropdown ?
                <div className="sidebar-day-dropdown-content">
                    {days.map((day, index) => {
                        return (
                            <div className="sidebar-day-dropdown-element" key={index}>
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
