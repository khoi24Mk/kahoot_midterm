import privateAxios from '~/api/PrivateAxios';

export default async function getUserInGroup({ id }) {
  const response = await privateAxios.get(`/group/${id}/users`);
  return response;
}
