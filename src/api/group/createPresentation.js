import privateAxios from '../PrivateAxios';

export default async function createPresentation({
  groupId,
  presentationName,
  description,
}) {
  const response = await privateAxios.post(`/group/${groupId}/presentation`, {
    presentationName,
    description,
  });
  return response;
}
