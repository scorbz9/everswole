// React imports
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// Font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCaretDown, faHouse } from '@fortawesome/free-solid-svg-icons'

// Component imports
import UserDropdown from './UserDropdown'
import NewDropdown from './NewDropdown'
import DayDropdown from './DayDropdown'
import SplitDropdown from './SplitDropdown'
import Help from './Help'

import './SideBar.css'
import AddExerciseForm from './AddExerciseForm'
import MyExercises from './MyExercises'


const SideBar = ({ showMain, setShowMain, setShowAddMessage }) => {
    const user = useSelector(state => state.session.user)

    const [showLogout, setShowLogout] = useState(false);
    const [showNewDropdown, setShowNewDropdown] = useState(false)
    const [showDayDropdown, setShowDayDropdown] = useState(false)
    const [showSplitDropdown, setShowSplitDropdown] = useState(false)
    const [showAddExerciseForm, setShowAddExerciseForm] = useState(false)
    const [showExercises, setShowExercises] = useState(false)
    const [showHelp, setShowHelp] = useState(false)

    const toggleHome = () => {
        setShowMain('Home')
    }

    const toggleUserDropdown = () => {
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

    const toggleHelp = () => {
        setShowHelp(!showHelp)
    }

    const toggleAddExerciseForm = () => {
        setShowAddExerciseForm(!showAddExerciseForm)
    }

    const toggleExercises = () => {
        setShowExercises(!showExercises)
    }

    let toggleStyleDay;
    let toggleStyleSplit;

    if (showDayDropdown) {
        toggleStyleDay = {
            backgroundColor: "#333333"
        }
    }

    if (showSplitDropdown) {
        toggleStyleSplit = {
            backgroundColor: "#333333"
        }
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-user-info-container" onClick={toggleUserDropdown}>
                <div className="sidebar-user-info-image">❚█══█❚</div>
                <p className="sidebar-user-info-username">{user.email}</p>
                <div className="sidebar-user-info-dropdown-toggle"><FontAwesomeIcon icon={faCaretDown} /></div>
            </div>
            <UserDropdown showLogout={showLogout} setShowLogout={setShowLogout} showExercises={showExercises} setShowExercises={setShowExercises}/>
            <AddExerciseForm showAddExerciseForm={showAddExerciseForm} setShowAddExerciseForm={setShowAddExerciseForm} setShowAddMessage={setShowAddMessage}/>
            <div className="sidebar-new-dropdown-container" onClick={toggleNewDropdown}>
                <FontAwesomeIcon icon={faPlus}/> <p className="new-dropdown-text">New</p> <FontAwesomeIcon icon={faCaretDown} className="new-dropdown-caret"/>
            </div>
            <NewDropdown showNewDropdown={showNewDropdown} setShowNewDropdown={setShowNewDropdown} toggleAddExerciseForm={toggleAddExerciseForm} showMain={showMain} setShowMain={setShowMain} />

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
                <div className="sidebar-help" onClick={toggleHelp}>
                    How to Use
                </div>
                <Help showHelp={showHelp} setShowHelp={setShowHelp} toggleHelp={toggleHelp} showMain={showMain} setShowMain={setShowMain}/>
                <MyExercises showExercises={showExercises} setShowExercises={setShowExercises} />
            </div>
        </div>
    )
}

export default SideBar;
