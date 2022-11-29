import privateAxios from '../PrivateAxios';

export default async function createGroup({ groupName, description }) {
  const response = await privateAxios.post('/group', {
    groupName,
    description,
  });
  return response;
}
