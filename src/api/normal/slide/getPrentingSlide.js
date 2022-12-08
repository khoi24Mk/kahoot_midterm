import privateAxios from '~/api/PrivateAxios';

export default async function getPresentingSlide(presentationId) {
  const response = await privateAxios.get(
    `/presentation/${presentationId}/slide/presenting`
  );
  return response;
}
