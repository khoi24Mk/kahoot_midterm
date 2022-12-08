import privateAxios from '~/api/PrivateAxios';

export default async function getPresentationSlide({ presentationId }) {
  const response = await privateAxios.get(
    `/presentation/${presentationId}/slide`
  );
  return response;
}
