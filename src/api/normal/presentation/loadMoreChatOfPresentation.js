import privateAxios from '~/api/PrivateAxios';

export default async function loadMoreChatOfPresentation({
  presentationId,
  fromChat,
}) {
  const response = await privateAxios.get(
    `/presentation/${presentationId}/chat`,
    { params: { fromChat } }
  );
  return response;
}
