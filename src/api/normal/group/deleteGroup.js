import privateAxios from '~/api/PrivateAxios';

export default async function deleteGroup(groupId) {
  const response = await privateAxios.delete(`/group/${groupId}`);
  return response;
}
