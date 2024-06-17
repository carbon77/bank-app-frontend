import {Navigate, Outlet} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import {CircularProgress} from "@mui/material";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/authSlice.ts";
import {links} from "../../links";

export function ProtectedRoute({children}) {
    const {keycloak, initialized} = useKeycloak()
    const dispatch = useDispatch()

    if (!initialized) {
        return <CircularProgress/>
    }

    if (keycloak.authenticated) {
        keycloak.loadUserProfile().then(() => {
            dispatch(setUser(keycloak.profile))
        })
        return children ? children : <Outlet/>
    }

    return <Navigate to={links.login}/>
}