import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import styles from './header.scss';

export const Header = () => (
  <header className={styles.navHeader}>
    <h1 className={styles.logo}><Link className={styles.link} to="/">Arthur Wright</Link></h1>
    <ul>
      <li><NavLink className={styles.link} activeClassName={styles.active} to="/programmer">Programmer</NavLink></li>
      <li><NavLink className={styles.link} activeClassName={styles.active} to="/performer">Performer</NavLink></li>
    </ul>
  </header>
);
