import privateAxios from '~/api/PrivateAxios';

export default async function getSlideOfPresent(id) {
  const response = await privateAxios.get(`/presentation/${id}/slide`);
  return response;
}
