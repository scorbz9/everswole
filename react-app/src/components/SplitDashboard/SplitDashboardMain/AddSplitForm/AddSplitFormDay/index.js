import React from "react";

import { weekdays } from "../../../../utils";

import './AddSplitFormDay.css'


const AddSplitFormDay = ({ day, dayIndex, dayPosition, handleDayChange, startDate, unassignedDays, selected }) => {

    return (
        <div className="add-split-form-day add-split-form-dayOne">
            <h4>{weekdays[(startDate?.getDay() + Number(dayIndex)) % 7]}</h4>
            <select
                value={day}
                onChange={e => handleDayChange(e, dayPosition)}
                name={dayPosition}
                className="add-split-form-day-select"
            >
                <option value="">Rest Day</option>
                {unassignedDays.map((day, i) => {

                    return (
                        <option className={Object.values(selected).includes(`${day.id}`) ? "hide-option" : ""} key={i} value={day.id}>
                            {day.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default AddSplitFormDay
