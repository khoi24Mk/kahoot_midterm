import privateAxios from '~/api/PrivateAxios';

export default async function getGroup({ groupId }) {
  const response = await privateAxios.get(`/group/${groupId}`);
  return response;
}
