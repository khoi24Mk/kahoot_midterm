/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import Constant from '~/constants';

const publicAxios = axios.create({
  baseURL: Constant.BackEnd,
});

export default publicAxios;
