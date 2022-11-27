import privateAxios from '../PrivateAxios';

export default async function validate() {
  const response = await privateAxios.post('/me/validate');
  return response;
}
