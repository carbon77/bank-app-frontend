import {Navigate, Outlet} from "react-router-dom";
import {links} from "../../links";
import {useKeycloak} from "@react-keycloak/web";

export function NotAuthOnlyRoute({children}) {
    const {keycloak} = useKeycloak()

    if (keycloak.authenticated) {
        return <Navigate to={links.home}/>
    }

    if (children) {
        return children
    }
    return <Outlet/>
}