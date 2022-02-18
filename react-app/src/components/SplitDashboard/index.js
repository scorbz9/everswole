import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Store imports
import { getAllExercises } from "../../store/exercise";
import { getAllDays } from "../../store/day";

// Component imports
import SideBar from "./SideBar";
import SplitDashboardHero from "./SplitDashboardHero";
import SplitDashboardMain from "./SplitDashboardMain";

import './SplitDashboard.css'


const SplitDashboard = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        window.scroll(0, 240);

        (async() => {
            await dispatch(getAllExercises())
            await dispatch(getAllDays(userId))
        })();
    }, [dispatch])

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
