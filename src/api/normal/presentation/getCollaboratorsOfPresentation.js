import privateAxios from '~/api/PrivateAxios';

export default async function getCollaboratorsOfPresentation(presentationId) {
  const response = await privateAxios.get(
    `/presentation/${presentationId}/collaborator`
  );
  return response;
}
