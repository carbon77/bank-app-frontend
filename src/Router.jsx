import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {BankRoot} from "./pages/BankRoot";

export function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={"/"} errorElement={<div>Page not found</div>}>
                <Route path={"auth"} element={<AuthPage/>}/>
                <Route path={"bank"} element={<BankRoot/>}>
                </Route>
            </Route>
        )
    )

    return <RouterProvider router={router}/>
}