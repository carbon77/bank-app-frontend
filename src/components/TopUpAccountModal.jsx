import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {createTopUpOperationThunk, getOperationsThunk} from "../store/operationSlice";
import {LoadingButton} from "@mui/lab";
import {getAccountsThunk} from "../store/accountSlice";
import {MoneyInputFormat} from "../utils";

export function TopUpAccountModal({
                                      open,
                                      onClose,
                                      accountId,
                                  }) {
    const [topUpAmount, setTopUpAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        setLoading(true)
        await dispatch(createTopUpOperationThunk({amount: topUpAmount, accountId}))
        await dispatch(getAccountsThunk())
        await dispatch(getOperationsThunk({accountId}))
        setLoading(false)
        onClose()
    }

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
                    InputProps={{
                        inputComponent: MoneyInputFormat,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Пополнить</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}