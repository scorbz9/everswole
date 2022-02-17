import React, { useState } from 'react'
import { useSelector } from 'react-redux'


import LogoutDropdown from './LogoutDropdown'

import './SideBar.css'


const SideBar = () => {
    const user = useSelector(state => state.session.user)

    const [showLogout, setShowLogout] = useState(false)

    const toggleLogoutDropdown = () => {
        setShowLogout(!showLogout)
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-user-info-container" onClick={toggleLogoutDropdown}>
                {/* placeholder for profile pic */}
                <div className="sidebar-user-info-image">🔴</div>
                <p className="sidebar-user-info-username">{user.email}</p>
                <div className="sidebar-user-info-dropdown-container">
                    <div className="sidebar-user-info-dropdown-toggle"></div>
                </div>
            </div>
            <LogoutDropdown showLogout={showLogout} setShowLogout={setShowLogout}/>

            <div className="create">

            </div>
        </div>
    )
}

export default SideBar;
