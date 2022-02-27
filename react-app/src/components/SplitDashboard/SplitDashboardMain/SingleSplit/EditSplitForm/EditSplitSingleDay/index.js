import React from "react";

import './EditSplitSingleDay.css'

const EditSplitSingleDay = ({ day, dayOfWeek, handleDayChange, unassignedDays, selected }) => {

    return (
        <div className="add-split-form-day">
            <h4>{dayOfWeek}</h4>
            <select
                value={day}
                onChange={e => handleDayChange(e, dayOfWeek.toLowerCase())}
                name={day}
                className="add-split-form-day-select"
            >
                <option value="">Rest Day</option>
                {unassignedDays.map((dayOption, i) => {

                    return (
                        <option className={Object.values(selected).includes(`${dayOption.id}`) ? "hide-option" : ""} key={i} value={dayOption.id}>
                            {dayOption.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default EditSplitSingleDay;
