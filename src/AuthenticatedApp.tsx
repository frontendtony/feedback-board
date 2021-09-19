import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import PageFallbackSpinner from './components/common/PageFallbackSpinner';
import './styles/main.css';

const Home = React.lazy(() => import('./components/Home'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const PageTransition = React.lazy(() => import('./components/PageTransition'));
const Roadmap = React.lazy(() => import('./components/Roadmap.tsx'));
const ViewFeedback = React.lazy(() => import('./components/ViewFeedback'));
const CreateFeedback = React.lazy(() => import('./components/CreateFeedback'));
const EditFeedback = React.lazy(() => import('./components/CreateFeedback'));

export default function AuthenticatedApp() {
  return (
    <Suspense fallback={<PageFallbackSpinner />}>
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
                  <ViewFeedback />
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
          <Route exact path="/suggestions">
            <Redirect to="/" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
