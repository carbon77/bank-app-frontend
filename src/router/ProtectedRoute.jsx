import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {links} from "./links";

export function ProtectedRoute({children}) {
    const token = useSelector(state => state.auth.token)

    if (!token) {
        return <Navigate to={links.login}/>
    }

    if (children) {
        return children
    }
    return <Outlet/>
}