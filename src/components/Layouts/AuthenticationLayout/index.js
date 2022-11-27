import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/Context';

export default function AuthenticationLayout() {
  const context = useContext(AuthContext);
  const { profile } = context;
  const unAuthenticated = profile === null || profile === undefined;
  return unAuthenticated ? <Outlet /> : <Navigate to="/home" />;
}
