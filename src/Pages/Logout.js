import { logout } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { clearMessage } from "../redux/actions/message";
import { useEffect } from "react";

export const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout())
        dispatch(clearMessage())
    },[dispatch])
}