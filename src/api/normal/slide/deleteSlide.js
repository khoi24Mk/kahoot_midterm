import privateAxios from '~/api/PrivateAxios';

export default async function deleteSlide(id, slide) {
  const response = await privateAxios.delete(
    `/presentation/${id}/slide/${slide}`
  );
  return response;
}
