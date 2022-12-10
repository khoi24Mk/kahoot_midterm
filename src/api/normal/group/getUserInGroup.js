import privateAxios from '~/api/PrivateAxios';

export default async function getUserInGroup({ id }) {
  try {
    const response = await privateAxios.get(`/group/${id}/users`);
    return response.data.object;
  } catch (error) {
    return null;
  }
}
