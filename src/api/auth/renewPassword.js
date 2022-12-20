import axiosPublic from '../PublicAxios';

export default async function renewPassword({ username, password, email }) {
  const response = await axiosPublic.post('/auth/password/renew', {
    username,
    password,
    email,
  });
  return response;
}
