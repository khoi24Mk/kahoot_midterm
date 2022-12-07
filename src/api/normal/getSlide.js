import privateAxios from '../PrivateAxios';

export default async function getSlide(id, SlideId) {
  console.log(id);
  const response = await privateAxios.get(
    `/presentation/${id}/slide/${SlideId}`
  );
  console.log(response?.data.object);
  return response?.data.object;
}
