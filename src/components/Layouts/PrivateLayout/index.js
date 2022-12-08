import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import validate from '~/api/normal/profile/validate';
import { AuthContext } from '~/Context';

export default function PrivateLayout() {
  const context = useContext(AuthContext);
  const { profile, setProfile } = context;
  const unAuthenticated = profile === null || profile === undefined;
  const { pathname, search } = useLocation();
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
