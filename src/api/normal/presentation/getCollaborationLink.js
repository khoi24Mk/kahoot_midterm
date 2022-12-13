import privateAxios from '~/api/PrivateAxios';

export default async function getCollaborationLink(presentationId) {
  const response = await privateAxios.post(
    `/presentation/${presentationId}/invitation`
  );
  return response;
}
