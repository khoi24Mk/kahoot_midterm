/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import Header from '~/components/Layouts/components/Header';
// import Sidebar from '~/components/Layouts/Sidebar';

function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
