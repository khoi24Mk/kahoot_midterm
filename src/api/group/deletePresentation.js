import privateAxios from '../PrivateAxios';

export default async function deletePresentation({ presentationId }) {
  console.log(presentationId);
  const response = await privateAxios.delete(`/presentation/${presentationId}`);
  return response;
}
