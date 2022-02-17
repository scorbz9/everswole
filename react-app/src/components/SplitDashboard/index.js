import React, { useEffect, useState } from "react";

// Component imports
import SideBar from "./SideBar";
import SplitDashboardHero from "./SplitDashboardHero";
import SplitDashboardMain from "./SplitDashboardMain";

import './SplitDashboard.css'

const SplitDashboard = () => {

    useEffect(() => {
        window.scroll(0, 240);
    })

    const [showAddDayForm, setShowAddDayForm] = useState(false);

    return (
        <div className="split-dashboard-container">
            <SideBar showAddDayForm={showAddDayForm} setShowAddDayForm={setShowAddDayForm} />
            <div className="split-dashboard-right">
                <SplitDashboardHero />
                <SplitDashboardMain showAddDayForm={showAddDayForm} setShowAddDayForm={setShowAddDayForm} />
            </div>
        </div>
    )
}

export default SplitDashboard
