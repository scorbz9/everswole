import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SplashMain.css'


const SplashMain = () => {
    return (
        <div className="splash-main-container">
            <h1 className="greeting">
                Tame your workout, organize your gains
            </h1>
            <h2 className="greeting-subtitle">
                Remember everything and tackle any workout with your exercises, notes, and weekly schedule all in one place
            </h2>
            <button className='splash-main-sign-up'>Sign up for free</button>
            <a href="/login">Already have an account? Log in</a>
        </div>
    )
}

export default SplashMain
