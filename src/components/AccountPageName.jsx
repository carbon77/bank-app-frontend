import {IconButton, Stack, TextField, Typography} from "@mui/material";
import {Cancel, Edit} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useShowSnackbar} from "../utils";
import {getAccountsThunk, patchAccountThunk} from "../store/accountSlice";

export function AccountPageName({account}) {
    const [isFormShow, setIsFormShow] = useState(false)
    const [accountName, setAccountName] = useState(account.name)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()

    useEffect(() => {
        setAccountName(account.name)
    }, [isFormShow])

    async function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)
        await dispatch(patchAccountThunk({
            accountId: account.id,
            data: {
                name: accountName,
            }
        }))
        await dispatch(getAccountsThunk())
        setIsLoading(false)
        showSnackbar("Название счёта изменено")
        setIsFormShow(false)
    }

    if (isFormShow) {
        return (
            <Stack
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                component={"form"}
                onSubmit={handleSubmit}
                mb={2}
            >
                <TextField
                    value={accountName}
                    onChange={e => setAccountName(e.target.value)}
                    size={"small"}
                    label={"Название счёта"}
                    color={"secondary"}
                    variant={"filled"}
                    disabled={isLoading}
                />

                <IconButton size={"small"} type={"submit"} disabled={accountName === ''}>
                    <Edit/>
                </IconButton>

                <IconButton size={"small"} onClick={() => setIsFormShow(false)}>
                    <Cancel/>
                </IconButton>
            </Stack>
        )
    }

    return (
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant={"h5"}>
                {account.name}
            </Typography>
            <IconButton size={"small"} sx={{color: 'white'}} onClick={() => setIsFormShow(true)}>
                <Edit/>
            </IconButton>
        </Stack>
    )
}