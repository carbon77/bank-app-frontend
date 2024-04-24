import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createWithdrawOperationThunk, getOperationsThunk} from "../store/operationSlice";
import {Alert, LoadingButton} from "@mui/lab";
import {getAccountsThunk} from "../store/accountSlice";

export function WithdrawAccountModal({
                                         open,
                                         onClose,
                                         accountId,
                                     }) {
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState('')

    function onCloseHandle() {
        setErrorMessage('')
        onClose()
    }

    async function handleSubmit(e) {
        setLoading(true)
        try {
            await dispatch(createWithdrawOperationThunk({amount: withdrawAmount, accountId}))
            await dispatch(getAccountsThunk())
            await dispatch(getOperationsThunk({accountId}))
            onCloseHandle()
        } catch (e) {
            setErrorMessage("Недостаточно денег на счету!")
        }
        setLoading(false)
    }

    function handleChange(e) {
        if (!isNaN(e.target.value)) {
            setWithdrawAmount(e.target.value)
        }
    }

    return (
        <Dialog open={open} onClose={onCloseHandle}>
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
                {!errorMessage ? null : (
                    <Alert severity={"error"}>{errorMessage}</Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseHandle}>Отмена</Button>
                <LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Снять</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}