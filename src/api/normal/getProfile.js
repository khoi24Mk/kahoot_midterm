import privateAxios from '../PrivateAxios';

export default async function getProfile() {
  try {
    const response = await privateAxios.get('/me');
    return response.data.object;
  } catch (error) {
    return null;
  }
}
