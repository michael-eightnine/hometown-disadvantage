import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {
  SplashView,
  StreamView
} from 'Routes';
import { Nav } from 'Components/Nav';
import streamData from 'Data/streamData';

const AppLayout = () => (
  <Router>
    <div className="app-container">
      <main className="content">
        <Switch>
          <Route exact path="/" component={SplashView} />
          <Route exact path="/content-stream" component={StreamView} />
          <Route path='/content-stream/:contentId' render={({ match }) => {
            const id = Number(match.params.contentId);
            const validId = typeof id === 'number';
            const inRange = id <= streamData.length - 1;
            // If the range or ID is invalid, redirect to the grid/stream page
            if (!inRange || !validId) return <Redirect to="/content-stream" />;
            // Otherwise, show the Stream with details open
            return <StreamView match={match} />;
          }} />
        </Switch>
      </main>
      <Nav />
    </div>
  </Router>
);

export default AppLayout;
