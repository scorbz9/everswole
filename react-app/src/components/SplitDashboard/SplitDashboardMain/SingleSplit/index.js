import React from "react";

import { useSelector } from "react-redux";

import './SingleSplit.css'

const SingleSplit = ({ showMain, setShowMain }) => {
    const index = showMain.substring(11)
    const days = useSelector(state => state.dayState.entries)
    const currentDay = days[index]

    return (
        <div>{index}</div>
    )
}

export default SingleSplit
