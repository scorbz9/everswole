import React from 'react'
import { useSelector } from 'react-redux'
import LogoutButton from '../../auth/LogoutButton'
import './SideBar.css'


const SideBar = () => {
    const user = useSelector(state => state.session.user)
    console.log(user)

    return (
        <>
        <div className="sidebar-container">
            <div className="sidebar-user-info-container">
                {/* placeholder for profile pic */}
                <div className="sidebar-user-info-image">🔴</div>
                <p className="sidebar-user-info-username">{user.username}</p>
                <LogoutButton />
            </div>
        </div>
        </>
    )
}

export default SideBar;
