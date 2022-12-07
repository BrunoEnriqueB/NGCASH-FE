import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { useContext } from 'react';
import { ApiContext } from './context/api';
import { NotFoundPage } from './pages/404';

export function Router() {
  const { token } = useContext(ApiContext);

  return (
    <Routes>
      <Route path='/' element={token ? <Home /> : <Navigate to='/login' />} />

      <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
      <Route
        path='/register'
        element={!token ? <Register /> : <Navigate to='/' />}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
