import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "../pages/ErrorPage";
import {PaymentsPage} from "../pages/PaymentsPage";
import {OperationsPage} from "../pages/OperationsPage";
import {ProfilePage} from "../pages/ProfilePage";
import {AuthPage} from "../pages/auth/AuthPage";
import {SignUpPage} from "../pages/auth/SignUpPage";
import {ProtectedRoute} from "./ProtectedRoute";
import {BankRoot} from "../pages/BankRoot";
import {HomePage} from "../pages/HomePage";
import {links} from "./links";
import {NotAuthOnlyRoute} from "./NotAuthOnlyRoute";

export function Router() {
    const routesForAuthenticatedOnly = [
        {
            path: links.home,
            errorElement: <ErrorPage/>,
            element: <ProtectedRoute><BankRoot/></ProtectedRoute>,
            children: [
                {index: true, element: <HomePage/>},
                {path: links.payments, element: <PaymentsPage/>},
                {path: links.operations, element: <OperationsPage/>},
                {path: links.profile, element: <ProfilePage/>},
            ]
        },
    ]

    const routesForNotAuthenticatedOnly = [
        {path: links.login, element: <NotAuthOnlyRoute><AuthPage/></NotAuthOnlyRoute>},
        {path: links.register, element: <NotAuthOnlyRoute><SignUpPage/></NotAuthOnlyRoute>},
    ]

    const router = createBrowserRouter([
        ...routesForNotAuthenticatedOnly,
        ...routesForAuthenticatedOnly,
    ])

    return <RouterProvider router={router}/>
}