import React from "react";
import { useEffect } from "react";

// Component imports
import SideBar from "./SideBar";
import SplitDashboardHero from "./SplitDashboardHero";
import SplitDashboardMain from "./SplitDashboardMain";

import './SplitDashboard.css'

const SplitDashboard = () => {

    useEffect(() => {
        window.scroll(0, 240);
    })

    return (
        <div className="split-dashboard-container">
            <SideBar />
            <div className="split-dashboard-right">
                <SplitDashboardHero />
                <SplitDashboardMain />
            </div>
        </div>
    )
}

export default SplitDashboard
