/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */

import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import validate from '~/api/normal/validate';
import { AuthContext } from '~/Context';

export default function PrivateLayout() {
  const context = useContext(AuthContext);
  const { profile, setProfile } = context;
  const unAuthenticated = profile === null || profile === undefined;

  const { pathname } = useLocation();
  useEffect(() => {
    const asyncValidate = async () => {
      try {
        const response = await validate();
        return response;
      } catch (error) {
        setProfile(null);
        return null;
      }
    };

    asyncValidate();
  }, [pathname]);

  return unAuthenticated ? (
    <Navigate
      to="/login"
      state={{
        redirectUrl: pathname,
      }}
    />
  ) : (
    <Outlet />
  );
}
