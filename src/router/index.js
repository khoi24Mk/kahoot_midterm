/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Group from '~/pages/Group';
import Register from '~/pages/Register';

const publicRouters = [
  {
    path: '/',
    element: Home,
  },
  { path: '/profile', element: Profile },
  { path: '/login', element: Login, layout: null },
  { path: '/group', element: Group, layout: null },
  { path: '/group/:id', element: Group, layout: null },
  { path: '/register', element: Register, layout: null },
];

const privateRouters = [];

export { publicRouters, privateRouters };
