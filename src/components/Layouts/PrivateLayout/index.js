/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '~/Context';

export default function PrivateLayout() {
  const context = useContext(AuthContext);
  const { profile } = context;

  const unAuthenticated = profile === null || profile === undefined;
  return unAuthenticated ? <Navigate to="/login" /> : <Outlet />;
}
