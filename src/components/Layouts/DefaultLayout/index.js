import { Outlet } from 'react-router-dom';
import Header from '~/components/Layouts/DefaultLayout/patitials/Header';

function DefaultLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="flex-grow-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
