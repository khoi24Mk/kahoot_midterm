import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthenticationLayout from './components/Layouts/AuthenticationLayout';

import Group from './pages/Group';
import DefaultLayout from './components/Layouts/DefaultLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import ProfileLayout from './components/Layouts/ProfileLayout';
import NotAuthentication from './pages/errors/NotAuthentication';
import NotFound from './pages/errors/NotFound';
import NotPermission from './pages/errors/NotPermisson';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Invitation from './pages/redirections/Invitation';
import Verification from './pages/redirections/Verification';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/verification" element={<Verification />} />
        <Route element={<ProfileLayout />}>
          <Route element={<AuthenticationLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<DefaultLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<PrivateLayout />}>
            <Route path="/invitation" element={<Invitation />} />
            <Route path="/group" element={<Group />} />
            <Route path="/group/:id" element={<Group />} />
            <Route element={<DefaultLayout />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
        <Route path="/notAuthentication" element={<NotAuthentication />} />
        <Route path="/notPermission" element={<NotPermission />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
