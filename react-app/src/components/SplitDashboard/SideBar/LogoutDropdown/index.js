import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/session'

import './LogoutDropdown.css'

const LogoutDropdown = ({ showLogout, setShowLogout }) => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        await dispatch(logout());
    };

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
    }, [showLogout])


    return (
        <>
            {showLogout ?
                <div className="sidebar-dropdown" ref={ref}>
                    <button id="sidebar-dropdown-logout" onClick={onLogout}>Logout</button>
            </div> : <></>}
        </>
    )
}

export default LogoutDropdown;
