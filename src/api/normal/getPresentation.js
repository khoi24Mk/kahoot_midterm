import privateAxios from '../PrivateAxios';

export default async function getPresentation(presentationId) {
  const response = await privateAxios.get(`/presentation/${presentationId}`);
  return response;
}
