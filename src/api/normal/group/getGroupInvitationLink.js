import privateAxios from '~/api/PrivateAxios';

export default async function getGroupInvitationLink({ groupId }) {
  const response = await privateAxios.post(`/group/${groupId}/invitation`);
  return response;
}
