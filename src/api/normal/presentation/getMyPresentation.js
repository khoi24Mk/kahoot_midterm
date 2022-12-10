import privateAxios from '~/api/PrivateAxios';

export default async function getMyPresentation() {
  const response = await privateAxios.get(`/me/presentation`);
  return response;
}
