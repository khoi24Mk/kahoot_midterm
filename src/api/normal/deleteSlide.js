import privateAxios from '../PrivateAxios';

export default async function deleteSlide(id, slide) {
  console.log('SILDE ID from delete');
  console.log(id);
  const response = await privateAxios.delete(
    `/presentation/${id}/slide/${slide}`
  );
  console.log(response?.data.object);
  return response?.data.object;
}
