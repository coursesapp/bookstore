import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PublicRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/" /> : element;
};

export default PublicRoute;