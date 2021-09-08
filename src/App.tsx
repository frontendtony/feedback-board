import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateFeedback from './components/CreateFeedback';
import Home from './components/Home';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new">
          <CreateFeedback />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
