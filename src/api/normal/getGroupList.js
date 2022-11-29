/* eslint-disable array-callback-return */
import privateAxios from '../PrivateAxios';

export default async function getGroupList() {
  try {
    const response = await privateAxios.get('/me/groups');
    console.log('GROUPS');
    console.log(response.data.object);
    response.data.object.map((item) => {
      console.log('ITEM');
      console.log(item);
    });
    return response.data.object;
  } catch (error) {
    return null;
  }
}
