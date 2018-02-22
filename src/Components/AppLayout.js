import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import {
  SplashView,
  StreamView,
  AboutView,
  DetailView
} from 'Routes';
import { Nav } from 'Components/Nav';
import { BASE_URL } from 'Data/constants';
import streamData from 'Data/streamData';

const AppLayout = () => (
  // TODO: DEV ONLY BASENAME!
  <Router basename={BASE_URL}>
    <LastLocationProvider watchOnlyPathname>
      <div className="app-container">
        <main className="content">
          <Switch>
            {/* Splash */}
            <Route exact path="/" component={SplashView} />
            {/* About */}
            <Route exact path="/about-the-hta" component={AboutView} />
            {/* Grid */}
            <Route exact path="/content-stream" component={StreamView} />
            {/* Detail View with logic */}
            <Route path='/content-stream/:contentId' render={({ match }) => {
              const id = Number(match.params.contentId);
              const validId = typeof id === 'number';
              const inRange = id <= streamData.length - 1;
              // If the range or ID is invalid, redirect to the grid/stream page
              if (!inRange || !validId)
                return <Redirect to="/content-stream" />;
              // Otherwise, show the Detail view
              return <DetailView activeId={id} />;
            }} />
            {/* Fallback Route, redirect to splash on unknown route */}
            <Route
              path='/'
              render={() => <Redirect to='/' />}
            />
          </Switch>
        </main>
        <Nav />
      </div>
    </LastLocationProvider>
  </Router>
);

export default AppLayout;
