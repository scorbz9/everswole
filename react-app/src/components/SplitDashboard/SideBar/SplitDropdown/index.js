import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { parseDate } from '../../../utils';

import './SplitDropdown.css'

const SplitDropdown = ({showSplitDropdown, setShowSplitDropdown, showMain, setShowMain}) => {
    const splits = useSelector(state => state.splitState.entries)

    const toggleSplitInfo = (index) => {
        setShowMain(`SingleSplit${index}`)
    }

    return (
        <>
            {showSplitDropdown ?
                <div className="sidebar-day-dropdown-content">
                    {splits.map((split, index) => {

                    const startDate = new Date(split?.start_date);
                    const endDate = new Date(split?.end_date)

                    const start = parseDate(startDate)
                    const end = parseDate(endDate)

                        return (
                            <div className="sidebar-split-dropdown-element" key={index} onClick={() => toggleSplitInfo(index)}>
                                {start} - {end}
                            </div>
                        )
                    })}
                </div>
                : <></>
            }
        </>

    )
}

export default SplitDropdown
