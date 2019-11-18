import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { SplashView, StreamView, AboutView, DetailView } from 'Routes';
import { Nav } from 'Components/Nav';
import { streamData } from 'Data';
import { validateDetailRoute, validateStreamRoute } from 'Util';

const AppLayout = () => (
  <Router>
    <LastLocationProvider watchOnlyPathname>
      <div className="app-container">
        <main className="content">
          <Switch>
            {/* Splash */}
            <Route exact path="/" component={SplashView} />
            {/* About */}
            <Route exact path="/about-the-hta" component={AboutView} />
            {/* Grid View with logic */}
            <Route
              exact
              path="/content-stream/:chapterId"
              render={({
                match: {
                  params: { chapterId }
                }
              }) => {
                const maxChapter = streamData.length - 1;
                const isValidPath = validateStreamRoute(chapterId, maxChapter);
                // If the chapter ID is valid, return that chapter view of the content stream
                if (isValidPath)
                  return <StreamView chapterId={Number(chapterId)} />;
                // Otherwise, return to the first chapter of the content stream
                return <Redirect to="/content-stream/0" />;
              }}
            />
            {/* Detail View with logic */}
            <Route
              path="/content-stream/:chapterId/:contentId"
              render={({
                match: {
                  params: { chapterId, contentId }
                }
              }) => {
                const maxChapter = streamData.length - 1;
                const maxContent = streamData[chapterId].content.length - 1;
                const isValidPath = validateDetailRoute(
                  chapterId,
                  contentId,
                  maxChapter,
                  maxContent
                );
                // If we have a valid path, return the detail view for that path
                if (isValidPath)
                  return (
                    <DetailView
                      chapterId={Number(chapterId)}
                      contentId={Number(contentId)}
                    />
                  );
                // Otherwise, return to the first chapter of the content stream
                return <Redirect to="/content-stream/0" />;
              }}
            />
            {/* Fallback Route, redirect to splash on unknown route */}
            <Route path="/" render={() => <Redirect to="/" />} />
          </Switch>
        </main>
        <Nav />
      </div>
    </LastLocationProvider>
  </Router>
);

export default AppLayout;
