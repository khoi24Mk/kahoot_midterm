/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import Constant from '~/constants';
import memoizedRefreshToken from './normal/profile/refreshToken';

axios.defaults.baseURL = Constant.BackEnd;
axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken != null) {
      config.headers = {
        ...config.headers,
        AUTHORIZATION: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const token = await memoizedRefreshToken();

      if (token?.access_token) {
        config.headers = {
          ...config.headers,
          AUTHORIZATION: `Bearer ${token?.access_token}`,
        };
        localStorage.setItem('access_token', token?.access_token);
        return axios(config);
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    return Promise.reject(error);
  }
);
const privateAxios = axios;
export default privateAxios;
