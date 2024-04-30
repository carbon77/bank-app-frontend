import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {patternFormatter} from "react-number-format";
import React, {useState} from "react";
import {PhoneNumberFormat} from "../pages/auth/SignUpPage";
import {useDispatch} from "react-redux";
import {getUserThunk, patchUserThunk} from "../store/authSlice";
import {useShowSnackbar} from "../utils";

function ProfilePhoneDialog({user, open, onClose, ...props}) {
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const showSnackbar = useShowSnackbar()
    const dispatch = useDispatch()

    async function handleClick() {
        if (phoneNumber === '' || phoneNumber === user.phoneNumber) {
            return
        }

        await dispatch(patchUserThunk({phoneNumber}))
        await dispatch(getUserThunk())
        showSnackbar("Телефон успешно изменён!")
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} {...props}>
            <DialogTitle>Редактирование</DialogTitle>
            <DialogContent sx={{width: '400px'}}>
                <TextField
                    sx={{m: '1em 0'}}
                    required
                    fullWidth
                    label={"Телефон"}
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    InputProps={{
                        inputComponent: PhoneNumberFormat,
                    }}
                />
                <DialogActions>
                    <Button onClick={onClose} color={"primary"} value={"outlined"}>Отмена</Button>
                    <Button color={"primary"} onClick={handleClick}>Сохранить</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export function ProfilePhonePanel({user}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <Paper elevation={3} sx={{p: '1em 2em'}}>
            <Typography variant={"h5"} sx={{mb: '10px'}}>Номер телефона</Typography>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography>{patternFormatter(user.phoneNumber.toString(), {format: '+# (###) ###-##-##'})}</Typography>
                <IconButton color={"primary"} onClick={() => setIsDialogOpen(true)}>
                    <Edit/>
                </IconButton>
            </Stack>

            <ProfilePhoneDialog user={user} open={isDialogOpen}
                                onClose={() => setIsDialogOpen(false)}/>
        </Paper>
    )
}