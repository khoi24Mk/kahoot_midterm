import privateAxios from '~/api/PrivateAxios';

export default async function updateSlide(
  id,
  slideId,
  answer,
  content,
  options
) {
  const response = await privateAxios.put(
    `/presentation/${id}/slide/${slideId}`,
    {
      answer,
      content,
      options,
    }
  );
  return response;
}
