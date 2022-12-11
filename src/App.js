import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationLayout from './components/Layouts/AuthenticationLayout';

import DefaultLayout from './components/Layouts/DefaultLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import ProfileLayout from './components/Layouts/ProfileLayout';
import NotAuthentication from './pages/errors/NotAuthentication';
import NotFound from './pages/errors/NotFound';
import NotPermission from './pages/errors/NotPermisson';
import GroupDetail from './pages/Group/components/ContentGroup/GroupDetail';
import GroupList from './pages/Group/components/ContentGroup/GroupList';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPresentation from './pages/MyPresentation';
import Presentation from './pages/presentation';
import Profile from './pages/Profile';
import Invitation from './pages/redirections/Invitation';
import Verification from './pages/redirections/Verification';
import Register from './pages/Register';
import Slide from './pages/Slide';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route element={<ProfileLayout />}>
            <Route element={<AuthenticationLayout />}>
              <Route path="/verification" element={<Verification />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<DefaultLayout />}>
              <Route path="/home" element={<Home />} />

              <Route element={<PrivateLayout />}>
                <Route path="/presentation" element={<MyPresentation />} />
                <Route path="/invitation" element={<Invitation />} />
                <Route path="/group" element={<GroupList />} />
                <Route path="/group/:id" element={<GroupDetail />} />
                <Route path="/presentation/:id/slide" element={<Slide />} />
                <Route path="/presentation/:id" element={<Presentation />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>
          <Route path="/notAuthentication" element={<NotAuthentication />} />
          <Route path="/notPermission" element={<NotPermission />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
