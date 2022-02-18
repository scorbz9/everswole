import React from 'react'

import AddDayForm from './AddDayForm'

import './SplitDashboardMain.css'


const SplitDashboardMain = ({ showAddDayForm }) => {

    return (
        <>
            {showAddDayForm ?
                <AddDayForm /> :

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
            }
        </>
    )
}

export default SplitDashboardMain;
