/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from './components/Layouts/DefaultLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import ProfileLayout from './components/Layouts/ProfileLayout';
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route element={<ProfileLayout />}>
          <Route path="/home" element={<Home />} />
          <Route element={<DefaultLayout />}>
            <Route element={<PrivateLayout />}>
              <Route path="/invitation" element={<Invitation />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
