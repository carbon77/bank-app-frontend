import {Outlet} from "react-router-dom";

export function BankRoot() {
    return (
        <div>
            Bank root

            <div style={{border: "2px solid red"}}>
                <Outlet />
            </div>
        </div>
    )
}