import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from "react";
import { WebsiteContext } from "./context/Context";

function Protected() {
    const { isAuth, loading } = useContext(WebsiteContext)
    if (!isAuth && !loading) return <Navigate to='/login' replace />

    return <Outlet />
}

export default Protected;