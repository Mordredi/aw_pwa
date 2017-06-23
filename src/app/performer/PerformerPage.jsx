import React from 'react';

import { Page } from '../common/page';
import { About } from './about';
import { Contact } from './contact';
import { Media } from './media';

const routes = [
  {
    label: 'About',
    path: '',
    component: About,
  }, {
    label: 'Media',
    path: '/media',
    component: Media,
  }, {
    label: 'Contact',
    path: '/contact',
    component: Contact,
  },
];

const section = 'Performer';
const routeProps = { routes, section };

export const PerformerPage = props => <Page {...props} routeProps={routeProps} />;
