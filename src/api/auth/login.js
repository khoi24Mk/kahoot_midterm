import axiosPublic from '../PublicAxios';

export default async function login({ username, password }) {
  const response = await axiosPublic.post('/auth/login', {
    username,
    password,
  });

  return response;
}
