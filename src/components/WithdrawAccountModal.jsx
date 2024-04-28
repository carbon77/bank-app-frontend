import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Stack,
    TextField
} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createWithdrawOperationThunk, getOperationsThunk} from "../store/operationSlice";
import {Alert, LoadingButton} from "@mui/lab";
import {getAccountsThunk} from "../store/accountSlice";
import {MoneyInputFormat} from "../utils";
import {AccountSelect} from "./AccountSelect";

export function WithdrawAccountModal({
                                         open,
                                         onClose,
                                         accountId = null,
                                     }) {
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedAccount, setSelectedAccount] = useState(accountId ? accountId : null)

    function onCloseHandle() {
        setErrorMessage('')
        onClose()
    }

    async function handleSubmit(e) {
        setLoading(true)
        try {
            await dispatch(createWithdrawOperationThunk({amount: withdrawAmount, accountId: selectedAccount}))
            await dispatch(getAccountsThunk())

            if (selectedAccount === accountId) {
                await dispatch(getOperationsThunk({accountId: selectedAccount}))
            }
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
                <Stack spacing={2} mt={2} width={'400px'}>
                    <FormControl>
                        <InputLabel>Выберите счёт</InputLabel>
                        <AccountSelect value={selectedAccount}
                                       onChange={(e) => setSelectedAccount(e.target.value)}/>
                    </FormControl>
                    <TextField
                        autoFocus
                        required
                        label={"Сумма для снятия"}
                        fullWidth
                        value={withdrawAmount}
                        onChange={handleChange}
                        InputProps={{
                            inputComponent: MoneyInputFormat,
                        }}
                    />
                    {!errorMessage ? null : (
                        <Alert severity={"error"}>{errorMessage}</Alert>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseHandle}>Отмена</Button>
                <LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Снять</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}