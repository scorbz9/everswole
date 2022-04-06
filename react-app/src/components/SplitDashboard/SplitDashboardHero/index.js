// React/Redux imports
import React from 'react'

// Image imports
import plates2 from '../../img/everswole_unsplash_pic_2_resize.jpg'
import plates3 from '../../img/everswole_unsplash_pic_6_resize.jpg'

import './SplitDashboardHero.css'


const SplitDashboardHero = () => {

    return (
        <div className="split-dashboard-hero-container">
            <img src={plates3} className="split-dashboard-hero-image" alt="first blurred background weight plates"></img>
            <img src={plates2} className="split-dashboard-hero-image" alt="second blurred background weight plates"></img>
        </div>
    )
}

export default SplitDashboardHero;
