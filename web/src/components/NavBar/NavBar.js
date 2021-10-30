import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const NavBar = ({ loggedIn = false, role, onLogOutClick }) => {
  return (
    <header>
      <div className="container">
        <a className="home" href="/">
          Hub
        </a>
        {loggedIn && <ul>
          {role === 'admin' &&<li><a href="/admin">Admin</a></li> }
          <li><button type="button" onClick={onLogOutClick}>Log out</button></li>
          <li><a href="/search">Search</a></li>
        </ul>}
      </div>
    </header>
  );
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool,
  role: PropTypes.oneOf(['admin','employee']),
  onLogOutClick: PropTypes.func,
}

NavBar.defaultProps = {
  loggedIn: false,
  onLogOutClick: null,
}

export default NavBar;