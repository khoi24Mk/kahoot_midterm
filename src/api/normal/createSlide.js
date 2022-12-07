import privateAxios from '../PrivateAxios';

export default async function createSlide(id) {
  console.log('PRESENTATION ID');
  console.log(id);
  const response = await privateAxios.post(`/presentation/${id}/slide`, {
    answer: 'This is another answer',
    content: 'How old are you?',
    options: [
      'This is answer v1',
      "This isn't answer v1",
      'This is another answer v2',
    ],
  });
  console.log(response?.data.object);
  return response?.data.object;
}
