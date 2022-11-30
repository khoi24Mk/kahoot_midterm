import privateAxios from '../PrivateAxios';

export default async function changeRole({ groupId, userId, role }) {
  const response = await privateAxios.post(`/group/${groupId}/roleAssigment`, {
    role,
    userId,
  });
  return response;
}
