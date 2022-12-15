import privateAxios from '~/api/PrivateAxios';

export default async function getChatOfPresentation(presentationId) {
  const response = await privateAxios.get(
    `/presentation/${presentationId}/chat`
  );
  return response;
}
