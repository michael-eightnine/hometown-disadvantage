import React from 'react';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from 'Data/constants';
import logo from 'Svg/logo-stacked-thin.svg';
import './nav.scss';

/**
 * Nav Menu component
 * Renders the navigation links that appear under the HTA logo
 * A special nav class is applied to hide this menu on the splash page (index page)
 *
 * @returns {ReactComponent} NavMenu component
 */
const NavMenu = () => {
  // This component exists outside of the Router's `<Switch>` case
  // So window.location.pathname is used instead of `withRouter` props
  const navClass = window.location.pathname === `${BASE_URL}/`
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
