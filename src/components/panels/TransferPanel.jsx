import React, {useState} from "react";
import {IconButton, Stack, Typography} from "@mui/material";
import {TransferForm} from "../forms/TransferForm";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Panel} from "./Panel";

export function TransferPanel() {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <Panel>
            <Stack direction={'row'} alignItems={"center"} justifyContent={'space-between'}>
                <Typography sx={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    width: '100%',
                }} onClick={() => setIsFormOpen(v => !v)} variant={"h6"}>Перевод</Typography>
                <IconButton size={'large'} onClick={() => setIsFormOpen(v => !v)}>
                    {isFormOpen ? <ExpandLess/> : <ExpandMore/>}
                </IconButton>
            </Stack>
            {isFormOpen ? <TransferForm/> : null}
        </Panel>
    )
}