import privateAxios from '~/api/PrivateAxios';
import Constant from '~/constants';

async function createDefaultMultipleChoiceSlide(id) {
  const response = await privateAxios.post(`/presentation/${id}/slide`, {
    content: 'Question',
    options: ['Option 1', 'Option 2', 'Option 3'],
    type: Constant.SlideType.multipleChoie,
  });
  return response;
}

async function createDefaultHeadingSlide(id) {
  const response = await privateAxios.post(`/presentation/${id}/slide`, {
    content: 'Heading',
    options: ['Sub Heading'],
    type: Constant.SlideType.heading,
  });
  return response;
}
async function createDefaultParagraphSlide(id) {
  const response = await privateAxios.post(`/presentation/${id}/slide`, {
    content: 'Title',
    options: ['Paragraph'],
    type: Constant.SlideType.paragraph,
  });
  return response;
}

const SlideAction = {
  createDefaultMultipleChoiceSlide,
  createDefaultHeadingSlide,
  createDefaultParagraphSlide,
};

export default SlideAction;
