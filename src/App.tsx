import { Transition } from '@headlessui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { default as CreateFeedback, default as EditFeedback } from './components/CreateFeedback';
import Home from './components/Home';
import ViewFeedback from './components/ViewFeedback';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/new">
          <Transition
            show
            appear
            key="/new"
            enter="transition-all duration-100"
            enterFrom="translate-y-10 opacity-50"
            enterTo="translate-y-0 opacity-100"
            leave="transition-all duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="opacity-0 translate-y-10"
          >
            <CreateFeedback />
          </Transition>
        </Route>
        <Route exact path="/:id">
          {({ location }) => (
            <Transition
              show
              appear
              key={location.key}
              enter="transition-all duration-100"
              enterFrom="translate-y-10 opacity-50"
              enterTo="translate-y-0 opacity-100"
              leave="transition-all duration-150"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="opacity-0 translate-y-10"
            >
              <ViewFeedback feedback={location.state as App.Request} />
            </Transition>
          )}
        </Route>
        <Route exact path="/:id/edit">
          {({ location }) => (
            <Transition
              show
              appear
              key={location.key}
              enter="transition-all duration-100"
              enterFrom="translate-y-10 opacity-50"
              enterTo="translate-y-0 opacity-100"
              leave="transition-all duration-150"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="opacity-0 translate-y-10"
            >
              <EditFeedback feedback={location.state as App.Request} />
            </Transition>
          )}
        </Route>
        <Route exact path="/">
          <Transition
            show
            appear
            key="/"
            enter="transition-all duration-100"
            enterFrom="-translate-y-10 opacity-50"
            enterTo="translate-y-0 opacity-100"
            leave="transition-all duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="opacity-0 -translate-y-10"
          >
            <Home />
          </Transition>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
