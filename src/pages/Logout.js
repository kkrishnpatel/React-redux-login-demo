import { logout } from "../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem("token");
        dispatch(logout())
    }, [dispatch])
}

export default  Logout;