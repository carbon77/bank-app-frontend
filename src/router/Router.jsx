import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {ErrorPage} from "../pages/ErrorPage";
import {OperationsPage} from "../pages/OperationsPage";
import {ProfilePage} from "../pages/ProfilePage";
import {AuthPage} from "../pages/auth/AuthPage";
import {SignUpPage} from "../pages/auth/SignUpPage";
import {ProtectedRoute} from "./ProtectedRoute";
import {BankRoot} from "../pages/BankRoot";
import {HomePage} from "../pages/HomePage";
import {links} from "./links";
import {NotAuthOnlyRoute} from "./NotAuthOnlyRoute";
import {AccountSidebarTemplate} from "../components/AccountSidebarTemplate";
import {CreateAccountPage} from "../pages/accounts/CreateAccountPage";
import {AccountPage} from "../pages/accounts/AccountPage";
import {CardPage} from "../pages/CardPage";
import {PaymentsPage} from "../pages/payments/PaymentsPage";
import {HousePaymentsPage} from "../pages/payments/HousePaymentsPage";

export function Router() {
    const routesForAuthenticatedOnly = [
        {
            path: links.home,
            errorElement: <ErrorPage/>,
            element: <ProtectedRoute><BankRoot/></ProtectedRoute>,
            handle: {
                title: 'Главная'
            },
            children: [
                {index: true, element: <AccountSidebarTemplate><HomePage/></AccountSidebarTemplate>},
                {
                    path: links.operations,
                    handle: {
                        title: 'Операции',
                    },
                    element: <AccountSidebarTemplate><OperationsPage/></AccountSidebarTemplate>,
                },
                {
                    path: links.profile,
                    handle: {
                        title: "Профиль",
                    },
                    element: <AccountSidebarTemplate><ProfilePage/></AccountSidebarTemplate>
                },
                {
                    path: links.payments,
                    handle: {
                        title: 'Платежи и переводы',
                    },
                    children: [
                        {
                            index: true,
                            element: <AccountSidebarTemplate><PaymentsPage/></AccountSidebarTemplate>,
                        },
                        {
                            path: "house",
                            handle: {
                                title: "ЖКХ",
                            },
                            element: <AccountSidebarTemplate><HousePaymentsPage/></AccountSidebarTemplate>,
                        }
                    ]
                },
                {
                    path: links.accounts,
                    handle: {
                        title: 'Счета',
                    },
                    children: [
                        {
                            index: true,
                            element: <Navigate to={"/"}/>
                        },
                        {
                            path: ":accountId",
                            handle: {title: 'Счёт'},
                            element: <AccountPage/>
                        },
                        {
                            path: "create",
                            handle: {title: 'Открытие счёта'},
                            element: <AccountSidebarTemplate><CreateAccountPage/></AccountSidebarTemplate>
                        }
                    ]
                },
                {
                    path: links.cards, children: [
                        {path: ':cardId', element: <CardPage/>}
                    ]
                }
            ]
        },
    ]

    const routesForNotAuthenticatedOnly = [
        {path: links.login, element: <NotAuthOnlyRoute><AuthPage/></NotAuthOnlyRoute>},
        {path: "/login/register", element: <NotAuthOnlyRoute><SignUpPage/></NotAuthOnlyRoute>},
    ]

    const router = createBrowserRouter([
        ...routesForNotAuthenticatedOnly,
        ...routesForAuthenticatedOnly,
    ])

    return <RouterProvider router={router}/>
}