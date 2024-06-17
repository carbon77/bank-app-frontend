import {Alert, Stack, TextField} from "@mui/material";
import {AccountSelect} from "../shared/AccountSelect";
import {CustomPatternFormat, MoneyInputFormat} from "../../utils";
import {useShowSnackbar} from "../../hooks/useShowSnackbar"
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createTransferOperationThunk, getOperationsThunk} from "../../store/operationSlice";
import {getAccountsThunk} from "../../store/accountSlice";
import userService from "../../api/userService.ts";

export function TransferForm({accountId = null, ...props}) {
    const [foundUser, setFoundUser] = useState(null)
    const [userNotFoundError, setUserNotFoundError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [transferInfo, setTransferInfo] = useState({
        amount: '',
        recipientCard: '',
        message: '',
    })
    const [selectedAccount, setSelectedAccount] = useState(!!accountId ? accountId : null)
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()

    const handleChange = (field) => async (e) => {
        setTransferInfo({
            ...transferInfo,
            [field]: e.target.value,
        })

        if (field === 'recipientCard' && e.target.value.length === 16) {
            try {
                setLoading(true)
                setFoundUser(await userService.findUserByCardNumber(e.target.value))
                setUserNotFoundError(false)
            } catch (e) {
                setFoundUser(null)
                setUserNotFoundError(true)
            }
            setLoading(false)
        } else {
            setUserNotFoundError(false)
            setLoading(false)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await dispatch(createTransferOperationThunk({
                data: {
                    ...transferInfo,
                    senderAccountId: selectedAccount,
                }
            }))
            await dispatch(getAccountsThunk())
            await dispatch(getOperationsThunk({accountId: selectedAccount}))
            setErrorMessage("")
            showSnackbar("Перевод успешно произошёл!")
        } catch (e) {
            setErrorMessage("Ошибка при переводе")
            showSnackbar("Операция не прошла!", 'error')
        }
        setLoading(false)
    }

    return (
        <Stack {...props} component={'form'} onSubmit={handleSubmit} spacing={2} mt={2}>
            <AccountSelect value={selectedAccount}
                           onChange={(e) => setSelectedAccount(e.target.value)}/>
            <CustomPatternFormat
                required
                label={"Номер получателя"}
                fullWidth
                value={transferInfo.recipientCard}
                onChange={handleChange("recipientCard")}
                size={"small"}
                name={"toNumber"}
                format={"#### #### #### ####"}
                mask={"_"}
            />
            {foundUser ? (
                <Alert
                    severity={"success"}>Получатель: {foundUser.passport.firstName} {foundUser.passport.lastName[0]}.</Alert>
            ) : null}
            {userNotFoundError ? (
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
            <LoadingButton
                loading={loading} variant={"contained"}
                type={"submit"}>Перевести</LoadingButton>
        </Stack>
    )
}