import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './header.scss';

export const Header = () => (
  <header className="nav-header">
    <h1 className="logo"><Link to="/">Arthur Wright</Link></h1>
    <ul>
      <li><NavLink activeClassName="active" to="/programmer">Programmer</NavLink></li>
      <li><NavLink activeClassName="active" to="/performer">Performer</NavLink></li>
    </ul>
  </header>
);
