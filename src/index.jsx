/* eslint import/no-extraneous-dependencies: 'off' */

import 'normalize.css';

import React from 'react';
import { render } from 'react-dom';

import './index.scss';
import App from './app/App';

const root = document.getElementById('root');

const bootstrap = (Component) => {
  render(
    <Component />,
    root,
  );
};

bootstrap(App);
