import React from 'react'

import plates from '../../img/everswole_reverse.jpg'
import plates2 from '../../img/everswole_unsplash_pic_2_resize.jpg'
import plates3 from '../../img/everswole_unsplash_pic_6_resize.jpg'

import './SplitDashboardHero.css'


const SplitDashboardHero = () => {

    return (
        <div className="split-dashboard-hero-container">
            <img src={plates3} className="split-dashboard-hero-image"></img>
            <img src={plates2} className="split-dashboard-hero-image"></img>
        </div>
    )
}

export default SplitDashboardHero;
