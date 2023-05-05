import { logout } from "../Redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem("token");
        dispatch(logout())
    }, [dispatch])
}