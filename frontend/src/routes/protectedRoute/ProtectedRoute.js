import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const EditProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(((state) => state.auth));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location
              }
            }}
          />
        );
      }}
    />
  );
};
