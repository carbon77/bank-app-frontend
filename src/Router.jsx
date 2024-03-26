import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {AuthPage} from "./pages/auth/AuthPage";
import {BankRoot} from "./pages/BankRoot";
import {ErrorPage} from "./pages/ErrorPage";
import {SignUpPage} from "./pages/auth/SignUpPage";
import {HomePage} from "./pages/HomePage";
import {PaymentsPage} from "./pages/PaymentsPage";
import {OperationsPage} from "./pages/OperationsPage";
import {ProfilePage} from "./pages/ProfilePage";

export function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={"/"} errorElement={<ErrorPage/>}>
                <Route path={"auth"}>
                    <Route index element={<AuthPage/>}/>
                    <Route path={"signup"} element={<SignUpPage/>}/>
                </Route>
                <Route path={"bank"} element={<BankRoot/>}>
                    <Route index element={<HomePage />} />
                    <Route path={"payments"} element={<PaymentsPage />} />
                    <Route path={"operations"} element={<OperationsPage />} />
                    <Route path={"profile"} element={<ProfilePage />} />
                </Route>
            </Route>
        )
    )

    return <RouterProvider router={router}/>
}