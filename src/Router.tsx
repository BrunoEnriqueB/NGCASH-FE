import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

function ifAuthenticated(): boolean {
  return !!window.sessionStorage.getItem('token');
}

export function Router() {
  return (
    <Routes>
      {ifAuthenticated() && <Route path='/' element={<Home />} />}
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
    </Routes>
  );
}
