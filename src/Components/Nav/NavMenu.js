import React from 'react';
import { NavLink } from 'react-router-dom';
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
  const { location: { pathname } } = window;
  const navClass = pathname === '/'
    ? 'nav--is-splash'
    : '';

  // By default the current chapter is 0 (first chapter)
  let currentChapter = 0;
  // If we're in a content stream page (grid or detail views)
  // Then slice out the current chapter from the URL by pulling out the character present
  // immediately after `/content-stream/`, which is the URL param for `chapterId`
  // NOTE: This will break in the future if we have 10+ (double digit) chapter IDs
  if (pathname.includes('/content-stream/')) {
    const start = pathname.indexOf('/content-stream/') + '/content-stream/'.length;
    const end = start + 1;
    currentChapter = pathname.slice(start, end);
  }

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
