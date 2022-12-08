import privateAxios from '~/api/PrivateAxios';

export default async function validate() {
  const response = await privateAxios.post('/me/validate');
  return response;
}
