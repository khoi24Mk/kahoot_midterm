import privateAxios from '~/api/PrivateAxios';

export default async function deleteCollaboratorOfPresentation(
  collaboratorId,
  presentationId
) {
  const response = await privateAxios.delete(
    `/presentation/${presentationId}/collaborator/${collaboratorId}`
  );
  return response;
}
