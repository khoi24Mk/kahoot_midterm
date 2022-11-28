/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import Header from '~/components/Layouts/components/Header';

function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
