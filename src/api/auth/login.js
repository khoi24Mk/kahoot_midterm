import axiosPublic from '../PublicAxios';

export default async function login({ username, password }) {
  try {
    /// auth/refreshToken
    const response = await axiosPublic.post('/auth/login', {
      username,
      password,
    });
    const token = response?.data?.object;

    if (token?.access_token && token?.refresh_token) {
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);
    }
    return token;
  } catch (error) {
    return null;
  }
}
