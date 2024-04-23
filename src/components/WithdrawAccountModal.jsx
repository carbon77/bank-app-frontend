import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createWithdrawOperationThunk} from "../store/operationSlice";
import {LoadingButton} from "@mui/lab";
import {getAccountsThunk} from "../store/accountSlice";

export function WithdrawAccountModal({
                                         open,
                                         onClose,
                                         accountId,
                                     }) {
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        setLoading(true)
        await dispatch(createWithdrawOperationThunk({amount: withdrawAmount, accountId}))
        await dispatch(getAccountsThunk())
        setLoading(false)
        onClose()
    }

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
                <LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Снять</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}