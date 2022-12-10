import privateAxios from '~/api/PrivateAxios';

export default async function getGroupInvitationLink({ id }) {
  try {
    const response = await privateAxios.post(`/group/${id}/invitation`);
    return response.data.object;
  } catch (error) {
    return null;
  }
}
