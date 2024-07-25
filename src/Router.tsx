import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./pages/ErrorPage.jsx"
import { OperationsPage } from "./pages/OperationsPage.jsx"
import { ProfilePage } from "./pages/ProfilePage.jsx"
import { ProtectedRoute } from "./pages/utils/ProtectedRoute.jsx"
import { BankRoot } from "./pages/utils/BankRoot.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { links } from "./links.js"
import { AccountSidebarTemplate } from "./pages/utils/AccountSidebarTemplate.jsx"
import { CreateAccountPage } from "./pages/accounts/CreateAccountPage.jsx"
import { AccountPage } from "./pages/accounts/AccountPage.jsx"
import { CardPage } from "./pages/CardPage.jsx"
import { PaymentsPage } from "./pages/payments/PaymentsPage.jsx"
import { HousePaymentsPage } from "./pages/payments/HousePaymentsPage.jsx"
import { PaymentPage } from "./pages/payments/PaymentPage.jsx"
import { AnalyticsPage } from "./pages/AnalyticsPage.jsx"
import { NotAuthOnlyRoute } from "./pages/utils/NotAuthOnlyRoute.jsx"
import { AuthPage } from "./pages/auth/AuthPage.jsx"
import { ChatPage } from "./pages/ChatPage.tsx"
import React from 'react'
import { HasRoleRoute } from './pages/utils/HasRoleRoute.tsx'
import { AdminPage } from './pages/admin/AdminPage.tsx'

export function Router() {
    const routesForAuthenticatedOnly = [
        {
            path: links.home,
            errorElement: <ErrorPage />,
            element: <ProtectedRoute><BankRoot /></ProtectedRoute>,
            handle: {
                title: 'Главная'
            },
            children: [
                { index: true, element: <AccountSidebarTemplate><HomePage /></AccountSidebarTemplate> },
                {
                    path: links.operations,
                    handle: {
                        title: 'Операции',
                    },
                    children: [
                        {
                            index: true,
                            element: <AccountSidebarTemplate><OperationsPage /></AccountSidebarTemplate>,
                        },
                        {
                            path: 'analytics',
                            element: <AccountSidebarTemplate><AnalyticsPage /></AccountSidebarTemplate>,
                            handle: {
                                title: 'Анализ финансов',
                            },
                        },
                    ],
                },
                {
                    path: links.profile,
                    handle: {
                        title: "Профиль",
                    },
                    element: <AccountSidebarTemplate><ProfilePage /></AccountSidebarTemplate>
                },
                {
                    path: links.payments,
                    handle: {
                        title: 'Платежи и переводы',
                    },
                    children: [
                        {
                            index: true,
                            element: <AccountSidebarTemplate><PaymentsPage /></AccountSidebarTemplate>,
                        },
                        {
                            path: "house",
                            handle: {
                                title: "ЖКХ",
                            },
                            element: <AccountSidebarTemplate><HousePaymentsPage /></AccountSidebarTemplate>,
                        },
                        {
                            path: "pay/:categoryName",
                            handle: {
                                title: "Оплата",
                            },
                            element: <AccountSidebarTemplate><PaymentPage /></AccountSidebarTemplate>
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
                            element: <Navigate to={"/"} />
                        },
                        {
                            path: ":accountId",
                            handle: { title: 'Счёт' },
                            element: <AccountPage />
                        },
                        {
                            path: "create",
                            handle: { title: 'Открытие счёта' },
                            element: <AccountSidebarTemplate><CreateAccountPage /></AccountSidebarTemplate>
                        }
                    ]
                },
                {
                    path: links.cards, children: [
                        { path: ':cardId', element: <CardPage /> }
                    ]
                },
                {
                    path: 'chat',
                    handle: { title: 'Чат' },
                    children: [
                        {
                            index: true,
                            element: <ChatPage />
                        }
                    ]
                },
                {
                    path: 'admin',
                    element: <HasRoleRoute role='ROLE_EMPLOYEE' />,
                    children: [
                        {
                            index: true,
                            element: <AdminPage />
                        }
                    ]
                }
            ]
        },
    ]

    const routesForNotAuthenticatedOnly = [
        { path: links.login, element: <NotAuthOnlyRoute><AuthPage /></NotAuthOnlyRoute> },
    ]

    const router = createBrowserRouter([
        ...routesForNotAuthenticatedOnly,
        ...routesForAuthenticatedOnly,
    ])

    return <RouterProvider router={router} />
}