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
