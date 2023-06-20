import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const SuspenseLayout = (Component) => (
    <React.Suspense fallback={<>...</>}>
        <Outlet/>
    </React.Suspense>
  );
  
export const PrivateRoutes = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    return(
        isLoggedIn ? SuspenseLayout() : <Navigate to="/login"/>
    )
}