import React from 'react';

import { Page } from '../common/page';
import { About } from './about';
import { Contact } from './contact';
import { Portfolio } from './portfolio';

const routes = [
  {
    label: 'About',
    path: '',
    component: About,
  }, {
    label: 'Portfolio',
    path: '/portfolio',
    component: Portfolio,
  }, {
    label: 'Contact',
    path: '/contact',
    component: Contact,
  },
];

const section = 'Programmer';
const routeProps = { routes, section };

export const ProgrammerPage = props => <Page {...props} routeProps={routeProps} />;
