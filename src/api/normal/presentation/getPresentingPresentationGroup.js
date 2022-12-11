import privateAxios from '~/api/PrivateAxios';

export default async function getPresentingPresentationInGroup({ id }) {
  const response = await privateAxios.get(
    `/group/${id}/presentation/presenting`
  );
  return response;
}
