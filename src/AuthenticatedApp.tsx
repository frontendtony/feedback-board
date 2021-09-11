import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { default as CreateFeedback, default as EditFeedback } from './components/CreateFeedback';
import Home from './components/Home';
import NotFound from './components/NotFound';
import PageTransition from './components/PageTransition';
import Roadmap from './components/Roadmap.tsx';
import ViewFeedback from './components/ViewFeedback';
import './styles/main.css';

export default function AuthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/new">
          {({ location, history }) => {
            return (
              <PageTransition uniqueKey={location.key ?? 'new'} action={history.action}>
                <CreateFeedback />
              </PageTransition>
            );
          }}
        </Route>
        <Route exact path="/roadmap">
          {({ location, history }) => {
            return (
              <PageTransition uniqueKey={location.key ?? 'roadmap'} action={history.action}>
                <Roadmap />
              </PageTransition>
            );
          }}
        </Route>
        <Route exact path="/:id">
          {({ location, history }) => {
            return (
              <PageTransition uniqueKey={location.key ?? 'view-request'} action={history.action}>
                <ViewFeedback feedback={location.state as App.Request} />
              </PageTransition>
            );
          }}
        </Route>
        <Route exact path="/:id/edit">
          {({ location, history }) => {
            return (
              <PageTransition uniqueKey={location.key ?? 'edit-request'} action={history.action}>
                <EditFeedback feedback={location.state as App.Request} />
              </PageTransition>
            );
          }}
        </Route>
        <Route exact path="/">
          {({ location, history }) => {
            return (
              <PageTransition uniqueKey={location.key ?? 'home'} action={history.action}>
                <Home />
              </PageTransition>
            );
          }}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
