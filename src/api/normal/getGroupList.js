/* eslint-disable array-callback-return */
import privateAxios from '../PrivateAxios';

export default async function getGroupList() {
  try {
    const response = await privateAxios.get('/me/groups');
    return response.data.object;
  } catch (error) {
    return null;
  }
}
