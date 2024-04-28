import React, {useState} from "react";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {CustomPatternFormat, MoneyInputFormat} from "../utils";
import {LoadingButton} from "@mui/lab";
import {apiClient} from "../api";
import {createTransferOperationThunk, getOperationsThunk} from "../store/operationSlice";
import {getAccountsThunk} from "../store/accountSlice";
import {useDispatch} from "react-redux";

function ToNumberFormat(props) {
    return <CustomPatternFormat
        {...props}
        format={"#### #### #### ####"}
        mask={"_"}
        valueIsNumericString
    />
}


export function TransferAccountModal({
                                         open,
                                         onClose,
                                         accountId,
                                     }) {
    const [transferInfo, setTransferInfo] = useState({
        amount: 0,
        recipientCard: '',
        message: '',
    })
    const [foundUser, setFoundUser] = useState(null)
    const [userNotFound, setUserNotFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch()

    const handleChange = (field) => async (e) => {
        setTransferInfo({
            ...transferInfo,
            [field]: e.target.value,
        })

        if (field === 'recipientCard' && e.target.value.length === 16) {
            try {
                setLoading(true)
                setFoundUser(await apiClient.findUserByCardNumber(e.target.value))
                setUserNotFound(false)
            } catch (e) {
                setFoundUser(null)
                setUserNotFound(true)
            }
            setLoading(false)
        } else if (field === 'recipientCard') {
            setFoundUser(null)
            setUserNotFound(false)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await dispatch(createTransferOperationThunk({
                data: {
                    ...transferInfo,
                    senderAccountId: accountId,
                }
            }))
            await dispatch(getAccountsThunk())
            await dispatch(getOperationsThunk({accountId}))
            onClose()
        } catch (e) {
            setErrorMessage("Недостаточно денег на счету!")
        }
        setLoading(false)
    }

    return (
        <Dialog component={'form'} onSubmit={handleSubmit} open={open} onClose={onClose}>
            <DialogTitle>Перевод</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={2} width={'400px'}>
                    <TextField
                        autoFocus
                        required
                        label={"Номер получателя"}
                        fullWidth
                        value={transferInfo.recipientCard}
                        onChange={handleChange("recipientCard")}
                        size={"small"}
                        name={"toNumber"}
                        InputProps={{
                            inputComponent: ToNumberFormat,
                        }}
                    />
                    {foundUser ? (
                        <Alert
                            severity={"success"}>Получатель: {foundUser.passport.firstName} {foundUser.passport.lastName[0]}.</Alert>
                    ) : null}
                    {userNotFound ? (
                        <Alert severity={"error"}>Получатель не найден!</Alert>
                    ) : null}
                    <TextField
                        required
                        label={"Сумма"}
                        fullWidth
                        value={transferInfo.amount}
                        onChange={handleChange('amount')}
                        size={"small"}
                        name={"amount"}
                        InputProps={{
                            inputComponent: MoneyInputFormat,
                        }}
                    />
                    <TextField
                        multiline
                        rows={4}
                        label={"Сообщение"}
                        fullWidth
                        value={transferInfo.message}
                        name={"message"}
                        onChange={handleChange('message')}
                        size={"small"}
                    />
                    {!errorMessage ? null : (
                        <Alert severity={"error"}>{errorMessage}</Alert>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <LoadingButton loading={loading} disabled={!foundUser} variant={"contained"}
                               type={"submit"}>Перевести</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}