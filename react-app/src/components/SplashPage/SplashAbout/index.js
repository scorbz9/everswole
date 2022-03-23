import React from 'react';
import weightsPic from '../../img/everswole_weights.jpg'
import './SplashAbout.css'

const SplashAbout = () => {
    return (
        <div className="splash-about-container">
            <img className="splash-about-image" src={weightsPic}></img>
            <div className="splash-about-info-container">
                <div className="splash-about-info-section">
                    <p className="splash-about-info-header">REMEMBER EVERYTHING</p>
                    <p className="splash-about-info">Bring your notes, tasks, and schedules together to get workouts done more easily.</p>
                </div>
                <div className="splash-about-info-section">
                    <h3 className="splash-about-info-header">FIND IT FAST</h3>
                    <p className="splash-about-info">Have your daily workouts at your fingertips.</p>
                </div>
                <div className="splash-about-info-section">
                    <h3 className="splash-about-info-header">TRACK YOUR PROGRESS</h3>
                    <p className="splash-about-info">Easily access your past gym performances with our intuitive design.</p>
                </div>
            </div>
        </div>
    )
}

export default SplashAbout;
