import privateAxios from '../PrivateAxios';

export default async function getPresentationSlide({ presentationId }) {
  const response = await privateAxios.get(`/presentation/1/slide`);
  console.log(presentationId);
  return response;
}
