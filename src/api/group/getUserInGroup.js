import privateAxios from '../PrivateAxios';

export default async function getUserInGroup({ groupId }) {
  try {
    const response = await privateAxios.get(`/group/${groupId}/users`);
    return response.data.object;
  } catch (error) {
    return null;
  }
}
