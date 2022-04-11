// React/Redux imports
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

// State imports
import { logout } from '../../../../store/session'

import './UserDropdown.css'

const UserDropdown = ({ showLogout, setShowLogout, showMain, setShowMain }) => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    // TODO
    const toggleExercises = () => {

    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {

            if (showLogout && ref.current && !ref.current.contains(e.target)) {
                setShowLogout(false)
            }
        }

        document.addEventListener("click", checkIfClickedOutside)

        return () => {
        // Cleanup the event listener
        document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [showLogout, setShowLogout])


    return (
        <>
            {showLogout ?
                <div className="sidebar-dropdown" ref={ref}>
                    <button id="sidebar-dropdown-logout" className="sidebar-dropdown-element" onClick={toggleExercises}>View my exercises</button>
                    <button id="sidebar-dropdown-logout" className="sidebar-dropdown-element" onClick={onLogout}>Logout</button>
            </div> : <></>}
        </>
    )
}

export default UserDropdown;
