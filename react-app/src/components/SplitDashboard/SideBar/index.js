import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import LogoutDropdown from './LogoutDropdown'
import NewDropdown from './NewDropdown'

import './SideBar.css'


const SideBar = ({ showAddDayForm, setShowAddDayForm }) => {
    const user = useSelector(state => state.session.user)

    const [showLogout, setShowLogout] = useState(false);
    const [showNewDropdown, setShowNewDropdown] = useState(false)

    const toggleLogoutDropdown = () => {
        setShowLogout(!showLogout)
    }

    const toggleNewDropdown = () => {
        setShowNewDropdown(!showNewDropdown)
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
            <NewDropdown showNewDropdown={showNewDropdown} setShowNewDropdown={setShowNewDropdown} showAddDayForm={showAddDayForm} setShowAddDayForm={setShowAddDayForm}/>
        </div>
    )
}

export default SideBar;
