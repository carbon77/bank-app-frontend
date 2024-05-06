import {Panel} from "../panels/Panel";
import {Button, Typography} from "@mui/material";
import {Check} from "@mui/icons-material";
import React from "react";

export function PaymentSubmitForm({onClick}) {
    return (
        <Panel>
            <Typography variant={"h5"} mb={2}>Подтвердите платёж</Typography>
            <Button onClick={onClick} color={"primary"} startIcon={<Check/>} size={"large"}>Оплатить</Button>
        </Panel>
    )
}