import privateAxios from '~/api/PrivateAxios';

export default async function getGroupList() {
  const response = await privateAxios.get('/me/groups');
  return response;
}
