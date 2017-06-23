import React from 'react';
import PropTypes from 'prop-types';

import { Link, Route } from 'react-router-dom';

import './page.scss';

export const Page = ({ routeProps, match }) => (
  <article>
    <header className={`section-header ${routeProps.section.toLowerCase()}`}>
      <ul>
        { routeProps.routes.map(({ path, label }) => <li key={label}><Link to={match.url + path}>{ label }</Link></li>) }
      </ul>
    </header>
    <section>
      { routeProps.routes.map(({ path, component: Component, label }) => <Route key={label} exact path={match.url + path} component={Component} />) }
    </section>
  </article>
);

Page.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  routeProps: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    section: PropTypes.string.isRequired,
  }).isRequired,
};
