import {ButtonPanel} from "./ButtonPanel";
import {Add} from "@mui/icons-material";
import {TopUpAccountModal} from "../forms/TopUpAccountModal";
import {useState} from "react";

export function TopUpButtonPanel({...props}) {
    const [topUpOpen, setTopUpOpen] = useState(false)
    return (
        <>
            <ButtonPanel {...props} onClick={() => setTopUpOpen(true)}
                         primaryText={"Пополнение"} icon={<Add/>}/>
            <TopUpAccountModal
                open={topUpOpen}
                onClose={() => setTopUpOpen(false)}
            />
        </>
    )
}