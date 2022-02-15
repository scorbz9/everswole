
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import './NavBar.css'

const NavBar = ({ user }) => {
  return (
    <nav className='nav-bar'>
      <div className="logo">
        <span className='logo-img'>❚█══█❚</span>
        <span className='logo-text'>Everswole</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!user &&
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </>
        }
        {user &&
        <li>
          <LogoutButton />
        </li>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
