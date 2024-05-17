import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {createTopUpOperationThunk, getOperationsThunk} from "../../store/operationSlice";
import {Alert, LoadingButton} from "@mui/lab";
import {getAccountsThunk} from "../../store/accountSlice";
import {MoneyInputFormat} from "../../utils";
import {AccountSelect} from "../shared/AccountSelect";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";

export function TopUpAccountModal({
                                      open,
                                      onClose,
                                      accountId = null,
                                  }) {
    const [topUpAmount, setTopUpAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(accountId ? accountId : null)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()

    async function handleSubmit(e) {
        if (topUpAmount <= 0) {
            setError("Введите сумму")
            return
        }

        setLoading(true)
        try {
            await dispatch(createTopUpOperationThunk({amount: topUpAmount, accountId: selectedAccount}))
            await dispatch(getAccountsThunk())

            if (selectedAccount === accountId) {
                await dispatch(getOperationsThunk({accountId: selectedAccount}))
            }
            setLoading(false)
            showSnackbar("Операция успешно прошла!")
            onClose()
        } catch (e) {
            showSnackbar("Операция не прошла!", 'error')
        } finally {
            setLoading(false)
        }
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
                <Stack spacing={2} mt={2} width={'400px'}>
                    <AccountSelect value={selectedAccount}
                                   onChange={(e) => setSelectedAccount(e.target.value)}/>
                    <TextField
                        autoFocus
                        required
                        label={"Сумма для пополнения"}
                        fullWidth
                        value={topUpAmount}
                        onChange={handleChange}
                        variant={"outlined"}
                        InputProps={{
                            inputComponent: MoneyInputFormat,
                        }}
                    />
                    {!error ? null : (
                        <Alert severity={"error"}>{error}</Alert>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Пополнить</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}