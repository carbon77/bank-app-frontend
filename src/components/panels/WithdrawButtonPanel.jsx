import {ButtonPanel} from "./ButtonPanel";
import {Payment} from "@mui/icons-material";
import {WithdrawAccountModal} from "../forms/WithdrawAccountModal";
import {useState} from "react";

export function WithdrawButtonPanel({...props}) {
    const [withdrawOpen, setWithdrawOpen] = useState(false)
    return (
        <>
            <ButtonPanel {...props} onClick={() => setWithdrawOpen(true)}
                         primaryText={"Снятие"} icon={<Payment/>}/>

            <WithdrawAccountModal
                open={withdrawOpen}
                onClose={() => setWithdrawOpen(false)}
            />
        </>
    )
}