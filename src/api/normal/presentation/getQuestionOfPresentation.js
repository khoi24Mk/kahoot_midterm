import privateAxios from '~/api/PrivateAxios';

export default async function getQuestionOfPresentation(presentationId) {
  const response = await privateAxios.get(
    `/presentation/${presentationId}/question`
  );
  return response;
}
