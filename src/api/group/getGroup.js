import privateAxios from '../PrivateAxios';

export default async function getGroup({ groupId }) {
  try {
    const response = await privateAxios.get(`/group/${groupId}`);
    return response.data.object;
  } catch (error) {
    return null;
  }
}
