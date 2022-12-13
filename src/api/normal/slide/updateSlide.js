import privateAxios from '~/api/PrivateAxios';

export default async function updateSlide({ presentationId, editedSlide }) {
  const response = await privateAxios.put(
    `/presentation/${presentationId}/slide/${editedSlide.id}`,
    {
      ...editedSlide,
    }
  );
  return response;
}
