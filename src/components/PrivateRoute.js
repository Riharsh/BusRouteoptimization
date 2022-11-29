import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    return localStorage.getItem('token') ? <Outlet /> : <Navigate to='/login' />;
  };