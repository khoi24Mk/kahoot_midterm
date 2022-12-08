import privateAxios from '~/api/PrivateAxios';

export default async function joinGroup(code) {
  const response = await privateAxios.get(`/group/invitation/${code}`);
  return response;
}
