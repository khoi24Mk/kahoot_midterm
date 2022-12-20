import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationLayout from './components/Layouts/AuthenticationLayout';

import DefaultLayout from './components/Layouts/DefaultLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import ProfileLayout from './components/Layouts/ProfileLayout';
import EditingPresentationForCreator from './pages/EditingPresentation/EditingPresentationForCreator';
import EditingPresentationForSupporter from './pages/EditingPresentation/EditingPresentationForSupporter';
import NotAuthentication from './pages/errors/NotAuthentication';
import NotFound from './pages/errors/NotFound';
import NotPermission from './pages/errors/NotPermisson';
import GroupDetail from './pages/Group/GroupDetail';
import GroupList from './pages/Group/GroupList';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPresentation from './pages/MyPresentation';
import PresentingPresentation from './pages/PresentingPresentation';
import Profile from './pages/Profile';
import CollaborationInvitation from './pages/redirections/CollaborationInvitation';
import Invitation from './pages/redirections/Invitation';
import PasswordConfirmation from './pages/redirections/PasswordConfirmation';
import Verification from './pages/redirections/Verification';
import Register from './pages/Register';
import RenewPassword from './pages/RenewPassword';

function App() {
  return (
    <div>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route element={<ProfileLayout />}>
            <Route path="/password/renew" element={<RenewPassword />} />
            <Route
              path="/password/confirmation"
              element={<PasswordConfirmation />}
            />

            <Route element={<AuthenticationLayout />}>
              <Route path="/verification" element={<Verification />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<DefaultLayout />}>
              <Route path="/home" element={<Home />} />

              <Route element={<PrivateLayout />}>
                <Route
                  path="/presentation/collaborator"
                  element={<CollaborationInvitation />}
                />
                <Route path="/presentation" element={<MyPresentation />} />
                <Route path="/invitation" element={<Invitation />} />
                <Route path="/group" element={<GroupList />} />
                <Route path="/group/:id" element={<GroupDetail />} />
                <Route
                  path="/presentation/:id/editing"
                  element={<EditingPresentationForCreator />}
                />
                <Route
                  path="/presentation/:id/editing/supporter"
                  element={<EditingPresentationForSupporter />}
                />
                <Route
                  path="/presentation/:id/presenting"
                  element={<PresentingPresentation />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notPermission" element={<NotPermission />} />
              </Route>
            </Route>
          </Route>
          <Route path="/notAuthentication" element={<NotAuthentication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
