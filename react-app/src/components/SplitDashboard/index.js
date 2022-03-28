import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Store imports
import { getAllExercises } from "../../store/exercise";
import { getAllDays } from "../../store/day";
import { getAllSplits } from "../../store/split";

// Component imports
import SideBar from "./SideBar";
import SplitDashboardHero from "./SplitDashboardHero";
import SplitDashboardMain from "./SplitDashboardMain";
import Footer from "../SplashPage/Footer";

import './SplitDashboard.css'



const SplitDashboard = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {

        (async() => {
            await dispatch(getAllExercises())
            await dispatch(getAllDays(userId))
            await dispatch(getAllSplits(userId))
        })();
    }, [dispatch])

    const [showMain, setShowMain] = useState('Home');

    const [showEditMessage, setShowEditMessage] = useState(false)
    const [showAddMessage, setShowAddMessage] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)

    return (
        <div className="split-dashboard-container">
            {showAddMessage ?
                <div className="confirmation-message">
                    Successfully added.
                </div>
            : <></> }
            {showEditMessage ?
                <div className="confirmation-message">
                    Successfully updated.
                </div>
            : <></> }
            {showDeleteMessage ?
                <div className="confirmation-message">
                    Successfully deleted.
                </div>
            : <></> }
            <SideBar showMain={showMain} setShowMain={setShowMain} />
            <div className="split-dashboard-right">
                <SplitDashboardHero />
                <SplitDashboardMain showMain={showMain}
                    setShowMain={setShowMain}
                    setShowAddMessage={setShowAddMessage}
                    setShowEditMessage={setShowEditMessage}
                    setShowDeleteMessage={setShowDeleteMessage}
                />
            </div>
            <Footer />
        </div>
    )
}

export default SplitDashboard
