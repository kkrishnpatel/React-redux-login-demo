import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoutes = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
}