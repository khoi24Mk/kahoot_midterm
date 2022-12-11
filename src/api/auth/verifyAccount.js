import axiosPublic from '../PublicAxios';

export default async function verifyAccount({ code, verificationId }) {
  const response = await axiosPublic.get('/auth/verification', {
    params: {
      code,
      verificationId,
    },
  });

  return response;
}
