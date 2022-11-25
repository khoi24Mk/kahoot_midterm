import axiosPublic from '../PublicAxios';

export default async function registerAuth({
  username,
  password,
  displayName,
  email,
}) {
  try {
    /// auth/refreshToken
    const response = await axiosPublic.post('/auth/register', {
      username,
      password,
      displayName,
      email,
    });
    const reponseMessage = response?.data?.object;

    if (reponseMessage?.message === 'Successfully') {
      return true;
    }
    return false;
  } catch (error) {
    return null;
  }
}
