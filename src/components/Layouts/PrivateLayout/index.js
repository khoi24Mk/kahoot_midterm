import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '~/Context';

export default function PrivateLayout() {
  const context = useContext(AuthContext);
  const { profile, setProfile } = context;
  const unAuthenticated = profile === null || profile === undefined;
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (
      !localStorage.getItem('access_token') &&
      !localStorage.getItem('refresh_token')
    ) {
      setProfile(null);
    }
  }, [pathname]);

  return unAuthenticated ? (
    <Navigate
      to="/notAuthentication"
      state={{
        redirectUrl: pathname,
        search,
      }}
      replace
    />
  ) : (
    <Outlet />
  );
}
