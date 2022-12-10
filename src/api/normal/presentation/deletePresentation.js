import privateAxios from '~/api/PrivateAxios';

export default async function deletePresentation({ presentationId }) {
  const response = await privateAxios.delete(`/presentation/${presentationId}`);
  return response;
}
