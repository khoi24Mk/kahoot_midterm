import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import getProfile from '~/api/normal/profile/getProfile';
import Loading from '~/components/Loading';
import { AuthContext } from '~/Context';

export default function ProfileLayout() {
  const context = useContext(AuthContext);
  const { setProfile } = context;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGetProfile = async () => {
      try {
        const resProfile = await getProfile();
        setProfile(resProfile?.data?.object);
        setLoading(false);
      } catch (err) {
        setProfile(null);
      }
    };
    asyncGetProfile();
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
