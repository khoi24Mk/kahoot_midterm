import privateAxios from '~/api/PrivateAxios';

export default async function getGroupInvitationLink({ groupId }) {
  try {
    const response = await privateAxios.post(`/group/${groupId}/invitation`);
    return response.data.object;
  } catch (error) {
    return null;
  }
}
