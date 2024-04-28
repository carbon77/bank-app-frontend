import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TransferForm} from "./TransferForm";

export function TransferAccountModal({
                                         open,
                                         onClose,
                                         accountId,
                                     }) {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Перевод</DialogTitle>
            <DialogContent>
                <TransferForm width={"400px"} accountId={accountId}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}