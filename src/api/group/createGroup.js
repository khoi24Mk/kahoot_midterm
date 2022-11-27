import privateAxios from '../PrivateAxios';

export default async function createGroup({ groupName }) {
  const response = await privateAxios.post('/group', {
    groupName,
  });
  return response;
}
