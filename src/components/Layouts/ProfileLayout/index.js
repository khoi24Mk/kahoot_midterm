import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import getProfile from '~/api/normal/profile/getProfile';
import Loading from '~/components/Loading';
import { AuthContext } from '~/Context';

export default function ProfileLayout() {
  const context = useContext(AuthContext);
  const { setProfile, profile } = context;

  const asyncGetProfile = async () => {
    const retProfile = await getProfile();
    setProfile(retProfile);
    return retProfile;
  };
  const needProfile = profile === null || profile === undefined;
  const query = useQuery({
    queryKey: ['Profile'],
    queryFn: asyncGetProfile,
    enabled: needProfile,
  });
  return query.isFetching ? <Loading /> : <Outlet />;
}
