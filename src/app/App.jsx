import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { Header } from './header';
import { Home } from './home';
import { ProgrammerPage } from './programmer';
import { PerformerPage } from './performer';

export default () => (
  <Router>
    <main>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/programmer" component={ProgrammerPage} />
        <Route path="/performer" component={PerformerPage} />
      </Switch>
    </main>
  </Router>
);
