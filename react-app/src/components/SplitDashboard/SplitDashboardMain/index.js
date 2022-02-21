import React from 'react'

import AddDayForm from './AddDayForm'
import SingleDay from './SingleDay'

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
    }


}

export default SplitDashboardMain;
