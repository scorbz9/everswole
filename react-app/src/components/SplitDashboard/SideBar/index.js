import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCaretDown, faHouse } from '@fortawesome/free-solid-svg-icons'

import LogoutDropdown from './LogoutDropdown'
import NewDropdown from './NewDropdown'

import './SideBar.css'
import DayDropdown from './DayDropdown'
import SplitDropdown from './SplitDropdown'


const SideBar = ({ showMain, setShowMain }) => {
    const user = useSelector(state => state.session.user)

    const [showLogout, setShowLogout] = useState(false);
    const [showNewDropdown, setShowNewDropdown] = useState(false)
    const [showDayDropdown, setShowDayDropdown] = useState(false)
    const [showSplitDropdown, setShowSplitDropdown] = useState(false)

    const toggleHome = () => {
        setShowMain('Home')
    }

    const toggleLogoutDropdown = () => {
        setShowLogout(!showLogout)
    }

    const toggleNewDropdown = () => {
        setShowNewDropdown(!showNewDropdown)
    }

    const toggleDayDropdown = () => {
        setShowDayDropdown(!showDayDropdown)
    }

    const toggleSplitDropdown = () => {
        setShowSplitDropdown(!showSplitDropdown)
    }

    let toggleStyleDay;
    let toggleStyleSplit
    if (showDayDropdown) {
        toggleStyleDay = {
            backgroundColor: "#333333"
        }
    } else if (showSplitDropdown) {
        toggleStyleSplit = {
            backgroundColor: "#333333"
        }
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-user-info-container" onClick={toggleLogoutDropdown}>
                {/* placeholder for profile pic */}
                <div className="sidebar-user-info-image">🔴</div>
                <p className="sidebar-user-info-username">{user.email}</p>
                <div className="sidebar-user-info-dropdown-toggle"><FontAwesomeIcon icon={faCaretDown} /></div>
            </div>
            <LogoutDropdown showLogout={showLogout} setShowLogout={setShowLogout}/>

            <div className="sidebar-new-dropdown-container" onClick={toggleNewDropdown}>
                <FontAwesomeIcon icon={faPlus}/> <p className="new-dropdown-text">New</p> <FontAwesomeIcon icon={faCaretDown} className="new-dropdown-caret"/>
            </div>
            <NewDropdown showNewDropdown={showNewDropdown} setShowNewDropdown={setShowNewDropdown} showMain={showMain} setShowMain={setShowMain}/>
            <div className="main-switch-buttons-container">
                <div className="sidebar-home" onClick={toggleHome}>
                    <FontAwesomeIcon icon={faHouse} className="home-icon"/>Home
                </div>

                <div className="sidebar-day-dropdown-container" style={toggleStyleDay} onClick={toggleDayDropdown}>
                    <FontAwesomeIcon icon={faCaretDown} className="dropdown-caret"/> Days
                </div>
                <DayDropdown showDayDropdown={showDayDropdown} setShowDayDropdown={setShowDayDropdown} showMain={showMain} setShowMain={setShowMain}/>

                <div className="sidebar-split-dropdown-container" style={toggleStyleSplit} onClick={toggleSplitDropdown}>
                    <FontAwesomeIcon icon={faCaretDown} className="dropdown-caret"/> Splits
                </div>
                <SplitDropdown showSplitDropdown={showSplitDropdown} setShowSplitDropdown={setShowSplitDropdown}  showMain={showMain} setShowMain={setShowMain}/>
            </div>
        </div>
    )
}

export default SideBar;
