import { useKeycloak } from '@react-keycloak/web'
import { CircularProgress } from '@mui/material'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { links } from '../../links.ts'

export function HasRoleRoute({ role, children }: { role: string, children?: string | JSX.Element }) {

    const { keycloak, initialized } = useKeycloak()

    if (!initialized) {
        return <CircularProgress />
    }

    if (!keycloak.authenticated) {
        return <Navigate to={links.login} />
    }

    if (!keycloak.hasRealmRole(role)) {
        return <Navigate to={links.home} />
    }

    return children ? children : <Outlet />
}
