import {Panel} from "./Panel";
import {
    Alert,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {changePasswordThunk} from "../../store/authSlice";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";

export function ChangePasswordPanel() {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        newPasswordConfirmation: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()

    function changeHandler(field) {
        return e => {
            setFormData({
                ...formData,
                [field]: e.target.value,
            })

            if (field === 'newPasswordConfirmation') {
                if (e.target.value !== formData.newPassword) {
                    setError('Пароли не совпадают')
                } else {
                    setError(null)
                }
            }
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()

        if (formData.newPassword.length < 8) {
            setError("Минимальная длина пароля 8")
            return
        } else {
            setError(null)
        }

        setLoading(true)
        try {
            await dispatch(changePasswordThunk(formData))
            setError(null)
            showSnackbar("Пароль изменён")
            setFormData({
                password: '',
                newPassword: '',
                newPasswordConfirmation: '',
            })
        } catch (e) {
            setError('Неверный пароль')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Panel>
            <Grid container spacing={2} component={"form"} onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <Typography variant={"h5"}>Изменение пароля</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            size={"small"}
                            disabled={loading}
                            label={"Старый пароль"}
                            value={formData.password}
                            onChange={changeHandler('password')}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            size={"small"}
                            disabled={loading}
                            label={"Новый пароль"}
                            value={formData.newPassword}
                            onChange={changeHandler('newPassword')}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            size={"small"}
                            disabled={loading}
                            label={"Подтверждение пароля"}
                            value={formData.newPasswordConfirmation}
                            onChange={changeHandler('newPasswordConfirmation')}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>

                {!error ? null : (
                    <Grid item xs={12}>
                        <Alert severity={"error"}>{error}</Alert>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button disabled={loading} color={"primary"} variant={"contained"} type={"submit"}>
                        Изменить
                    </Button>
                </Grid>
            </Grid>
        </Panel>
    )
}