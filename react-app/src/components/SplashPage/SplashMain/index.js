import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
            <Link to="/sign-up" className='splash-main-sign-up' style={{color: "white"}}>Sign up for free</Link>
            <Link to="/login" className="splash-main-login">Already have an account? Log in</Link>
        </div>
    )
}

export default SplashMain
