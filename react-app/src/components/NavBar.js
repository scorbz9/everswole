
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import './NavBar.css'

const NavBar = ({ user }) => {
  return (
    <nav className='nav-bar'>
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
  );
}

export default NavBar;
