import React from 'react'

import AddDayForm from './AddDayForm'
import AddSplitForm from './AddSplitForm'
import SingleDay from './SingleDay'
import SingleSplit from './SingleSplit'

import './SplitDashboardMain.css'


const SplitDashboardMain = ({ showMain, setShowMain }) => {


    if (showMain === "Home") {

        return (
            <div className="split-dashboard-main-container">
                <div className="split-dashboard-day">

                </div>
                <div className="split-dashboard-day">

                </div>
                <div className="split-dashboard-day">

                </div>
                <div className="split-dashboard-day">

                </div>
                <div className="split-dashboard-day">

                </div>
                <div className="split-dashboard-day">

                </div>
                <div className="split-dashboard-day">

                </div>
            </div>
        )
    } else if (showMain === "AddDayForm") {

        return (
            <AddDayForm />
        )
    } else if (showMain.startsWith('SingleDay')) {

        return (
            <SingleDay showMain={showMain} setShowMain={setShowMain}/>
        )
    } else if (showMain === "AddSplitForm") {

        return (
            <AddSplitForm />
        )
    } else if (showMain.startsWith('SingleSplit')) {

        return (
            <SingleSplit showMain={showMain} setShowMain={setShowMain}/>
        )
    }


}

export default SplitDashboardMain;
