import React from "react";
import { useEffect } from "react";

// Component imports
import SideBar from "./SideBar";
import SplitDashboardHero from "./SplitDashboardHero";

import './SplitDashboard.css'

const SplitDashboard = () => {

    useEffect(() => {
        window.scroll(0, 170);
    })

    return (
        <div className="split-dashboard-container">
            <SideBar />
            <SplitDashboardHero />
        </div>
    )
}

export default SplitDashboard
