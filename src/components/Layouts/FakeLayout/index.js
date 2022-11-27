/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import FakeHander from '~/components/Layouts/components/FakeHeader';

function FakeLayout() {
  return (
    <div>
      <FakeHander />
      <div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default FakeLayout;
