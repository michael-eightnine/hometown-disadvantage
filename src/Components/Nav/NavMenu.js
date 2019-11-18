import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'Svg/logo-stacked-thin.svg';
import { getChapterFromPath } from 'Util';
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
  const {
    location: { pathname }
  } = window;
  const navClass = pathname === '/' ? 'nav--is-splash' : '';

  // Get the current chapter from the pathname
  // If no chapter is present, defaults to 0 (first chapter)
  const currentChapter = getChapterFromPath(pathname);

  return (
    <nav className={`nav ${navClass}`}>
      <img src={logo} className="nav__logo" alt="the hometown [dis]advantage" />
      <ul className="nav__links">
        <li className="nav__link">
          <NavLink
            exact
            to={`/content-stream/${currentChapter}`}
            activeClassName="nav-link--active"
          >
            See-It-All
          </NavLink>
        </li>
        <li className="nav__link">
          <NavLink to="/about-the-hta" activeClassName="nav-link--active">
            Learn-About-It
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
