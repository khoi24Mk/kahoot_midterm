import privateAxios from '../PrivateAxios';

export default async function updateSlide(
  id,
  slideId,
  answer,
  content,
  options
) {
  console.log('PRESENTATION ID');
  console.log(id);
  const response = await privateAxios.put(
    `/presentation/${id}/slide/${slideId}`,
    {
      answer,
      content,
      options,
    }
  );
  console.log(response?.data.object);
  return response?.data.object;
}
