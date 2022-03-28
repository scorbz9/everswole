import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'


import './NavBar.css'

const NavBar = ({ user }) => {

  const [show, setShow] = useState(false)

    const handleMenu = (e) => {
        e.preventDefault()
        setShow(!show)
    }

  return (
    <>
      <nav className='nav-bar nav-bar-wide'>
        <NavLink className='logo-home-link' to='/' exact={true}>
          <div className="logo">
            <span className='logo-img'>❚█══█❚</span>
            <span className='logo-text'>Everswole</span>
          </div>
        </NavLink>
        <ul className="nav-links-container">
          {!user &&
            <>
              <li className="nav-link">
                <NavLink to='/login' id="nav-login" exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to='/sign-up' id="nav-sign-up" exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </li>
            </>
          }
          {user &&
          <li className="nav-link">
            <LogoutButton />
          </li>
          }
        </ul>
      </nav>

      {/* Nav-bar for smaller screen sizes */}
      <nav className='nav-bar nav-bar-narrow'>
        <NavLink className='logo-home-link' to='/' exact={true}>
          <div className="logo">
            <span className='logo-img'>❚█══█❚</span>
            <span className='logo-text'>Everswole</span>
          </div>
        </NavLink>
        <div className='drop-button' >
          {show === false ? <button className='res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faBars} className='fa-nav-res' /></button>:<button className='res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faCaretSquareDown} className='fa-nav-res' /></button>}
          {show === true ? <Link className='res-nav-bar-links' to='/login'>Log in</Link>: <></>}
          {show === true ? <Link className='res-nav-bar-links' to='/sign-up'>Sign up</Link>: <></>}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
