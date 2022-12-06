import privateAxios from '../PrivateAxios';

export default async function getSlideOfPresent(id) {
  console.log('SILDE ID');
  console.log(id);
  const response = await privateAxios.get(`/presentation/${id}/slide`);
  console.log(response?.data.object);
  return response?.data.object;
}
