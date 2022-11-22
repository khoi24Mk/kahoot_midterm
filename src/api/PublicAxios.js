/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import UrlConstant from '~/constants/UrlConstant';

const publicAxios = axios.create({
  baseURL: UrlConstant.BackendUrl,
});

export default publicAxios;
