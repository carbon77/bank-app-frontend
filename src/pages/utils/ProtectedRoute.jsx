import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {links} from "../../links";
import {useEffect, useState} from "react";
import {fetchUserThunk, logout, setError} from "../../store/authSlice";
import {CircularProgress} from "@mui/material";

export function ProtectedRoute({children}) {
    const [loading, setLoading] = useState(true)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchUser() {
            setLoading(true)
            try {
                await dispatch(fetchUserThunk())
            } catch (e) {
                dispatch(setError(e.message))
                dispatch(logout())
            } finally {
                setLoading(false)
            }

        }

        if (token || localStorage.getItem("auth_token")) {
            fetchUser()
        }
    }, [dispatch])

    if (!token) {
        return <Navigate to={links.login}/>
    }

    if (loading) {
        return <CircularProgress/>
    }

    return children ? children : <Outlet/>
}