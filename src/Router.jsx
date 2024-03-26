import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {BankRoot} from "./pages/BankRoot";
import {ErrorPage} from "./pages/ErrorPage";
import {SignUpPage} from "./pages/SignUpPage";

export function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={"/"} errorElement={<ErrorPage/>}>
                <Route path={"auth"}>
                    <Route index element={<AuthPage/>}/>
                    <Route path={"signup"} element={<SignUpPage/>}/>
                </Route>
                <Route path={"bank"} element={<BankRoot/>}>
                </Route>
            </Route>
        )
    )

    return <RouterProvider router={router}/>
}