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
    const message = response.data.object;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return message;
  } catch (err) {
    return null;
  }
};

export default logout;
