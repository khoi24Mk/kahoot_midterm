import privateAxios from '~/api/PrivateAxios';

export default async function joinPresentation(code) {
  const response = await privateAxios.get(`/presentation/invitation/${code}`);
  return response;
}
