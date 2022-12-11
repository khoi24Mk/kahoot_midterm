import privateAxios from '~/api/PrivateAxios';

export default async function getPresentedPresentationInGroup({ id }) {
  const response = await privateAxios.get(
    `/group/${id}/presentation/presented`
  );
  return response;
}
