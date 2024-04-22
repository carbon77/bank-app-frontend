import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

export function TopUpAccountModal({
                                         open,
                                         onClose,
                                         onSubmit,
                                     }) {
    const [topUpAmount, setTopUpAmount] = useState('')

    function handleChange(e) {
        if (!isNaN(e.target.value)) {
            setTopUpAmount(e.target.value)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Пополнение счёта</DialogTitle>
            <DialogContent>
                <DialogContentText mb={1}>
                    Введите сумму для пополнения
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    label={"Сумма"}
                    fullWidth
                    value={topUpAmount}
                    onChange={handleChange}
                    variant={"standard"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button variant={"contained"} onChange={onSubmit}>Пополнить</Button>
            </DialogActions>
        </Dialog>
    )
}