import { User } from '@supabase/gotrue-js';
import React, { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import PageFallbackSpinner from './components/common/PageFallbackSpinner';
import ReloadPrompt from './ServiceWorkerPrompt';
import './styles/main.css';
import supabase from './utils/supabase';

const Home = React.lazy(() => import('./components/Home'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const PageTransition = React.lazy(() => import('./components/PageTransition'));
const Roadmap = React.lazy(() => import('./components/Roadmap.tsx'));
const ViewFeedback = React.lazy(() => import('./components/ViewFeedback'));
const CreateFeedback = React.lazy(() => import('./components/CreateFeedback'));
const EditFeedback = React.lazy(() => import('./components/CreateFeedback'));

const Auth = React.lazy(() => import('./components/Auth'));

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);
    });

    setLoading(false);

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  if (loading) return null;

  return (
    <Suspense fallback={<PageFallbackSpinner />}>
      <Toaster
        position="top-center"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#ffffff',
            color: '#3A4374',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4661E6',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#D73737',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Router>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          {/* <Route>{() => (user ? <AuthenticatedApp /> : <Redirect to="/auth/login" />)}</Route> */}
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
      <ReloadPrompt />
    </Suspense>
  );
}

export default App;
