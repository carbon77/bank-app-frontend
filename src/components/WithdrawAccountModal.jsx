import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";

export function WithdrawAccountModal({
    open,
    onClose,
    onSubmit,
                                     }) {
    const [withdrawAmount, setWithdrawAmount] = useState('')

    function handleChange(e) {
        if (!isNaN(e.target.value)) {
            setWithdrawAmount(e.target.value)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Снятие со счёта</DialogTitle>
            <DialogContent>
                <DialogContentText mb={1}>
                    Введите сумму для снятия
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    label={"Сумма"}
                    fullWidth
                    value={withdrawAmount}
                    onChange={handleChange}
                    variant={"standard"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button variant={"contained"} onChange={onSubmit}>Снять</Button>
            </DialogActions>
        </Dialog>
    )
}