import privateAxios from '~/api/PrivateAxios';

export default async function getProfile() {
  const response = await privateAxios.get('/me');
  return response;
}
