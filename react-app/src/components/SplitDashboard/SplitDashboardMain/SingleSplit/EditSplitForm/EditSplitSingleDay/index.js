import React from "react";

import { weekdays } from "../../../../../utils";

import './EditSplitSingleDay.css'

const EditSplitSingleDay = ({ day, dayIndex, dayPosition, startDate, handleDayChange, unassignedDays, selected }) => {

    return (
        <div className="add-split-form-day">
            <h4>{weekdays[(startDate?.getDay() + Number(dayIndex)) % 7]}</h4>
            <select
                value={day}
                onChange={e => handleDayChange(e, dayPosition)}
                name={dayPosition}
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
