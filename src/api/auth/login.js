import axiosPublic from '../PublicAxios';

export default async function login({ username, password }) {
  try {
    const response = await axiosPublic.post('/auth/refreshToken', {
      username,
      password,
    });
    const token = response?.data?.object;

    if (token?.access_token && token?.refresh_token) {
      localStorage.setItem('access_token', JSON.stringify(token.access_token));
      localStorage.setItem('access_token', JSON.stringify(token.refresh_token));
    }
    return token;
  } catch (error) {
    return null;
  }
}
