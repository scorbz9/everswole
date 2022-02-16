import React from 'react';
import SplashMain from './SplashMain';
import Footer from './Footer'
import './SplashPage.css'
import SplashAbout from './SplashAbout';


const SplashPage = () => {
    return (
        <div className="splash-page-container">
            <SplashMain />
            <SplashAbout />
            <Footer />
        </div>
    )
}

export default SplashPage;
