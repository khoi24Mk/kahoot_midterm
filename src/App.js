/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Group from './pages/Group';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Header from './components/Layouts/components/Header';
import DefaultLayout from './components/Layouts/DefaultLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route element={<DefaultLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/group" element={<Group />} />
            <Route path="/group/:id" element={<Group />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
