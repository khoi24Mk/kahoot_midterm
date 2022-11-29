import privateAxios from '../PrivateAxios';

export default async function sendInviteEmails({ id, emails }) {
  try {
    const response = await privateAxios.post(`/group/${id}/invitation/emails`, {
      emails,
    });
    return response.data.object;
  } catch (error) {
    return null;
  }
}
