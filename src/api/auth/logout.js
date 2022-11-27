/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axiosPublic from '../PublicAxios';

const logout = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axiosPublic.post(
      '/me/logout',
      {},
      {
        header: {
          AUTHORIZATION: `Bearer ${refreshToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return null;
  }
};

export default logout;
