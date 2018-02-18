import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'Svg/logo-stacked-thin.svg';
import './nav.scss';

const NavMenu = () => {
  const navClass = window.location.pathname === '/'
    ? 'nav--is-splash'
    : '';

  return (
    <nav className={`nav ${navClass}`}>
      <img src={logo} className="nav__logo" alt="the hometown [dis]advantage" />
      <ul className="nav__links">
        <li className="nav__link">
          <NavLink
            exact
            to="/content-stream"
            activeClassName="nav-link--active"
          >
            See-It-All
          </NavLink>
        </li>
        <li className="nav__link">
          <NavLink
            to="/about-the-hta"
            activeClassName="nav-link--active"
          >
            Learn-About-It
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default NavMenu;
