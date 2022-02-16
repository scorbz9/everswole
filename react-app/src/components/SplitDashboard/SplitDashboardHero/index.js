import React from 'react'

import plates from '../../img/everswole_reverse.jpg'
import plates2 from '../../img/everswole_plates.jpg'

import './SplitDashboardHero.css'


const SplitDashboardHero = () => {

    return (
        <div className="split-dashboard-hero-container">
            <img src={plates2} className="split-dashboard-hero-image"></img>
            <img src={plates} className="split-dashboard-hero-image"></img>
        </div>
    )
}

export default SplitDashboardHero;
