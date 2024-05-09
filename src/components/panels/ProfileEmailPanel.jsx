import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchUserThunk, patchUserThunk} from "../../store/authSlice";

function ProfileEmailDialog({user, open, onClose, ...props}) {
    const [email, setEmail] = useState(user.email)
    const dispatch = useDispatch()

    async function handleClick() {
        if (email === '' || email === user.email) {
            return
        }

        await dispatch(patchUserThunk({
            email
        }))
        await dispatch(fetchUserThunk())
    }

    return (
        <Dialog open={open} onClose={onClose} {...props}>
            <DialogTitle>Редактирование</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{m: '1em 0'}}
                    required
                    fullWidth
                    label={"Почта"}
                    value={email}
                    type={"email"}
                    onChange={e => setEmail(e.target.value)}
                />
                <DialogActions>
                    <Button onClick={onClose} color={"primary"} value={"outlined"}>Отмена</Button>
                    <Button color={"primary"} onClick={handleClick}>Сохранить</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export function ProfileEmailPanel({user}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <Paper elevation={3} sx={{p: '1em 2em'}}>
            <Typography variant={"h5"} sx={{mb: '10px'}}>Электронная почта</Typography>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography>{user.email}</Typography>
                {/*<IconButton color={"primary"} onClick={() => setIsDialogOpen(true)}>*/}
                {/*    <Edit/>*/}
                {/*</IconButton>*/}
            </Stack>


            <ProfileEmailDialog user={user} open={isDialogOpen}
                                onClose={() => setIsDialogOpen(false)}/>
        </Paper>
    )
}