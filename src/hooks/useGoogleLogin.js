/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useState } from 'react';
import publicAxios from '~/api/PublicAxios';

const useGoogleLogin = (redirect) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = async (response) => {
    try {
      setLoading(true);
      const loginResponse = await publicAxios.post(
        '/auth/login/google',
        {
          tokenId: response.credential,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (
        loginResponse.data?.object?.access_token &&
        loginResponse.data?.object?.refresh_token &&
        loginResponse.data?.object?.profile
      ) {
        localStorage.setItem(
          'access_token',
          loginResponse.data?.object?.access_token
        );
        localStorage.setItem(
          'refresh_token',
          loginResponse.data?.object?.refresh_token
        );
        redirect(loginResponse.data.object.profile);
      } else {
        setError('Not found token');
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleGoogle };
};

export default useGoogleLogin;
