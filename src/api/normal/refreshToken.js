/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import mem from 'mem';
import publicAxios from '~/api/PublicAxios';

const refreshTokenFn = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await publicAxios.post(
      '/auth/refreshToken',
      {},
      {
        headers: {
          AUTHORIZATION: `Bearer ${refreshToken}`,
        },
      }
    );
    const token = response.data.object;
    return token;
  } catch (error) {
    return null;
  }
};

const maxAge = 10000;

const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});

export default memoizedRefreshToken;
