import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
                        return (
                            <div className="sidebar-day-dropdown-element" key={index} onClick={() => toggleSplitInfo(index)}>
                                {split.start_date}
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
