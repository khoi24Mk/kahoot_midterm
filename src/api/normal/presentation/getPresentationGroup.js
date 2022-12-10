import privateAxios from '~/api/PrivateAxios';

export default async function getPresentationInGroup({ id }) {
  try {
    const response = await privateAxios.get(`/group/${id}/presentation`);
    return response.data.object;
  } catch (error) {
    return null;
  }
}
