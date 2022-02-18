import React from 'react'

import AddDayForm from './AddDayForm'

import './SplitDashboardMain.css'


const SplitDashboardMain = ({ showMain }) => {

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
    }


}

export default SplitDashboardMain;
