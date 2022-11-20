/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import getProfile from '~/api/normal/getProfile';
import { AuthContext } from '~/Context';
import Loading from '../Loading';

export default function PrivateRoute() {
  const context = useContext(AuthContext);
  const { setProfile, profile } = context;

  const asyncGetProfile = async () => {
    const retProfile = await getProfile();
    setProfile(retProfile);
    return retProfile;
  };
  const query = useQuery({ queryKey: ['Profile'], queryFn: asyncGetProfile });
  return query.isLoading ? (
    <Loading />
  ) : profile == null ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
}
