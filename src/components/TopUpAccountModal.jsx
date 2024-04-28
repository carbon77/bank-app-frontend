import {useState} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {createTopUpOperationThunk, getOperationsThunk} from "../store/operationSlice";
import {LoadingButton} from "@mui/lab";
import {getAccountsThunk} from "../store/accountSlice";
import {MoneyInputFormat} from "../utils";
import {AccountSelect} from "./AccountSelect";

export function TopUpAccountModal({
                                      open,
                                      onClose,
                                      accountId = null,
                                  }) {
    const [topUpAmount, setTopUpAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const accounts = useSelector(state => state.accounts.accounts)
    const [selectedAccount, setSelectedAccount] = useState(accountId ? accountId : accounts.at(0)?.id)
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        setLoading(true)
        await dispatch(createTopUpOperationThunk({amount: topUpAmount, accountId: selectedAccount}))
        await dispatch(getAccountsThunk())

        if (selectedAccount === accountId) {
            await dispatch(getOperationsThunk({accountId: selectedAccount}))
        }
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
                <Stack spacing={2} mt={2} width={'400px'}>
                    <FormControl>
                        <InputLabel>Выберите счёт</InputLabel>
                        <AccountSelect accounts={accounts} value={selectedAccount}
                                       onChange={(e) => setSelectedAccount(e.target.value)}/>
                    </FormControl>
                    <TextField
                        autoFocus
                        required
                        label={"Сумма для пополнения"}
                        fullWidth
                        value={topUpAmount}
                        onChange={handleChange}
                        variant={"standard"}
                        InputProps={{
                            inputComponent: MoneyInputFormat,
                        }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Пополнить</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}