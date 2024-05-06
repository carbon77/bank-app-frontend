import {ButtonPanel} from "./ButtonPanel";
import {SwapHoriz} from "@mui/icons-material";
import {useState} from "react";
import {TransferAccountModal} from "../shared/TransferAccountModal";

export function TransferButtonPanel({...props}) {
    const [transferOpen, setTransferOpen] = useState(false)

    return (
        <>
            <ButtonPanel {...props} onClick={() => setTransferOpen(true)}
                         primaryText={"Перевод"} icon={<SwapHoriz/>}/>

            <TransferAccountModal
                open={transferOpen}
                onClose={() => setTransferOpen(false)}
            />
        </>
    )
}