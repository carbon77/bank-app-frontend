import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./pages/ErrorPage.tsx"
import { OperationsPage } from "./pages/OperationsPage.tsx"
import { ProfilePage } from "./pages/ProfilePage.tsx"
import { ProtectedRoute } from "./pages/utils/ProtectedRoute.tsx"
import { BankRoot } from "./pages/utils/BankRoot.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { links } from "./links.ts"
import { AccountSidebarTemplate } from "./pages/utils/AccountSidebarTemplate.tsx"
import { CreateAccountPage } from "./pages/accounts/CreateAccountPage.tsx"
import { AccountPage } from "./pages/accounts/AccountPage.tsx"
import { CardPage } from "./pages/CardPage.tsx"
import { PaymentsPage } from "./pages/payments/PaymentsPage.tsx"
import { HousePaymentsPage } from "./pages/payments/HousePaymentsPage.tsx"
import { PaymentPage } from "./pages/payments/PaymentPage.tsx"
import { AnalyticsPage } from "./pages/AnalyticsPage.tsx"
import { NotAuthOnlyRoute } from "./pages/utils/NotAuthOnlyRoute.tsx"
import { AuthPage } from "./pages/auth/AuthPage.tsx"
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