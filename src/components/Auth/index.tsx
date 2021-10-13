import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useRouteMatch } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Auth() {
  const history = useHistory();
  let { url } = useRouteMatch();

  const isLogin = history.location.pathname !== '/auth/sign-up';

  return (
    <>
      <Helmet>
        <title>
          {`${location.pathname === '/auth/login' ? 'Login' : 'Sign Up'}`} - Feedback Board
        </title>
      </Helmet>
      <main className="bg-white rounded overflow-hidden mx-6 xs:mx-auto my-8 max-w-md">
        <div className="px-6 py-8 md:px-8 md:py-10">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${new Date().toISOString()}.svg`}
            height={80}
            width={80}
            className="mx-auto rounded-full mt-8"
            role="presentation"
          />
          <div
            className={`grid grid-cols-2 before:h-1 before:bg-primary before:w-1/2 pb-5 mt-10 ${
              !isLogin ? 'before:translate-x-full' : ''
            } relative before:absolute before:bottom-0 before:transition-transform -scale-x-90 border-b border-light border-opacity-40`}
            role="tablist"
          >
            <button
              onClick={() => history.replace(`${url}/login`)}
              className={`w-full text-center ${isLogin ? 'font-bold' : ''}`}
              role="tab"
              id="login-tab"
              aria-controls="login-tabpanel"
              aria-selected={isLogin}
            >
              Login
            </button>
            <button
              onClick={() => history.replace(`${url}/sign-up`)}
              className={`w-full text-center ${!isLogin ? 'font-bold' : ''}`}
              role="tab"
              id="signup-tab"
              aria-controls="signup-tabpanel"
              aria-selected={!isLogin}
            >
              Sign Up
            </button>
          </div>
          <h1 className="sr-only">{isLogin ? 'Login' : 'Sign up'}</h1>
          {isLogin ? (
            <div role="tabpanel" id="login-tabpanel">
              <LoginForm />
            </div>
          ) : (
            <div role="tabpanel" id="signup-tabpanel">
              <SignUpForm />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
