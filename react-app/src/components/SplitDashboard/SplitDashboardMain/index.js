// React imports
import React from 'react'

// Component imports
import DashboardHome from './DashboardHome'
import AddDayForm from './AddDayForm'
import AddSplitForm from './AddSplitForm'
import SingleDay from './SingleDay'
import SingleSplit from './SingleSplit'

import './SplitDashboardMain.css'


const SplitDashboardMain =
    ({ showMain,
    setShowMain,
    setShowAddMessage,
    setShowEditMessage,
    setShowDeleteMessage }) => {

    if (showMain === "Home") {

        return (
            <DashboardHome setShowMain={setShowMain} setShowEditMessage={setShowEditMessage} setShowDeleteMessage={setShowDeleteMessage}/>
        )
    } else if (showMain === "AddDayForm") {

        return (
            <AddDayForm
                setShowMain={setShowMain}
                setShowAddMessage={setShowAddMessage}
                setShowEditMessage={setShowEditMessage}
            />
        )
    } else if (showMain.startsWith('SingleDay')) {

        return (
            <SingleDay
                showMain={showMain}
                setShowMain={setShowMain}
                setShowEditMessage={setShowEditMessage}
                setShowDeleteMessage={setShowDeleteMessage}
            />
        )
    } else if (showMain === "AddSplitForm") {

        return (
            <AddSplitForm
                showMain={showMain}
                setShowMain={setShowMain}
                setShowAddMessage={setShowAddMessage}
            />
        )
    } else if (showMain.startsWith('SingleSplit')) {

        return (
            <SingleSplit
                showMain={showMain}
                setShowMain={setShowMain}
                setShowEditMessage={setShowEditMessage}
                setShowDeleteMessage={setShowDeleteMessage}
            />
        )
    }


}

export default SplitDashboardMain;
