import axiosPublic from '../PublicAxios';

export default async function confirmPassword(code) {
  const response = await axiosPublic.get(`/auth/password/confirmation/${code}`);
  return response;
}
