import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {links} from "../../links";
import {useEffect, useState} from "react";
import {apiClient} from "../../api";
import {getUserThunk} from "../../store/authSlice";

export function ProtectedRoute({children}) {
    const [userLoading, setUserLoading] = useState(false)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    async function getUser() {
        setUserLoading(true)
        try {
            await dispatch(getUserThunk())
        } catch (e) {
            console.error(e)
        }
        setUserLoading(false)

    }

    useEffect(() => {
        if (token) {
            apiClient.setToken(token)
            getUser()
        } else {
            apiClient.removeToken()
        }
    }, [token])

    if (!token) {
        return <Navigate to={links.login}/>
    }

    if (userLoading) {
        return <div>Loading...</div>
    }
    return children ? children : <Outlet/>
}