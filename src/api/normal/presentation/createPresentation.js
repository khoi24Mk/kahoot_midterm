import privateAxios from '~/api/PrivateAxios';

export default async function createPresentation({
  presentationName,
  description,
}) {
  const response = await privateAxios.post(`/presentation`, {
    presentationName,
    description,
  });
  return response;
}
