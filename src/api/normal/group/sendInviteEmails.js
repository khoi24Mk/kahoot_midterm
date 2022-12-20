import privateAxios from '~/api/PrivateAxios';

export default async function sendInviteEmails({ groupId, emails }) {
  const response = await privateAxios.post(
    `/group/${groupId}/invitation/emails`,
    {
      emails,
    }
  );
  return response;
}
