import { User } from '@supabase/gotrue-js';
import React, { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import PageFallbackSpinner from './components/common/PageFallbackSpinner';
import ReloadPrompt from './ServiceWorkerPrompt';
import './styles/main.css';
import supabase from './utils/supabase';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

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
    <>
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
          <Route>
            {() =>
              user ? (
                <Suspense fallback={<PageFallbackSpinner />}>
                  <AuthenticatedApp />
                </Suspense>
              ) : (
                <Redirect to="/auth/login" />
              )
            }
          </Route>
        </Switch>
      </Router>
      <ReloadPrompt />
    </>
  );
}

export default App;
