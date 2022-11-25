import axiosPublic from '../PublicAxios';

export default async function registerAuth({
  username,
  password,
  displayName,
  email,
}) {
  const response = await axiosPublic.post('/auth/register', {
    username,
    password,
    displayName,
    email,
  });
  return response;
}
