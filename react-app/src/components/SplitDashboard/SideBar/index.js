import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/session'

import './SideBar.css'


const SideBar = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        await dispatch(logout());
      };

    // Dropdown helpers
    const [showDropDown, setShowDropDown] = useState(false)

    const toggleClick = () => {
        setShowDropDown(!showDropDown)
    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {

        if (showDropDown && ref.current && !ref.current.contains(e.target)) {
            setShowDropDown(false)
        }
    }

    document.addEventListener("click", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [showDropDown])

    return (
        <div className="sidebar-container">
            <div className="sidebar-user-info-container" onClick={toggleClick}>
                {/* placeholder for profile pic */}
                <div className="sidebar-user-info-image">🔴</div>
                <p className="sidebar-user-info-username">{user.email}</p>
                <div className="sidebar-user-info-dropdown-container">
                    <div className="sidebar-user-info-dropdown-toggle"></div>
                </div>
            </div>
            {showDropDown ?
                        <div className="sidebar-dropdown" ref={ref}>
                            <button id="sidebar-dropdown-logout" onClick={onLogout}>Logout</button>
                        </div> : <></>}

            <div className="create">

            </div>
        </div>
    )
}

export default SideBar;
