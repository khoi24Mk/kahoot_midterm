/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';

const publicRouters = [
  {
    path: '/',
    element: Home,
  },
  { path: '/profile', element: Profile },
  { path: '/login', element: Login, layout: null },
];

const privateRouters = [];

export { publicRouters, privateRouters };
