import privateAxios from '~/api/PrivateAxios';

export default async function getMyCollaborationPresentation() {
  const response = await privateAxios.get(`/me/presentation/collaboration`);
  return response;
}
