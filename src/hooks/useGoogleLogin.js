/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useState } from 'react';
import publicAxios from '~/api/PublicAxios';

const useGoogleLogin = (handleSuccess, setNotify) => {
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
      handleSuccess(loginResponse?.data?.object);
    } catch (err) {
      setError(err?.response?.data?.message);
      setNotify({
        msg: err?.response?.data?.message,
        type: 'warning',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleGoogle };
};

export default useGoogleLogin;
