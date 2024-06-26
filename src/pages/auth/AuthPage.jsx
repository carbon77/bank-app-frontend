import {
    Alert,
    Box,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {LoginRounded, Visibility, VisibilityOff} from "@mui/icons-material";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../store/authSlice";
import {links} from "../../links";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";

export function AuthPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const errorAuth = useSelector(state => state.auth.error)
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showSnackbar = useShowSnackbar()
    const [showPassword, setShowPassword] = useState(false)

    function handleChange(name) {
        return e => {
            setLoginData(data => {
                const newData = {
                    ...data,
                    [name]: e.target.value,
                }
                return newData
            })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = await dispatch(loginThunk(loginData))
            navigate(links.home, {replace: true})
            showSnackbar("Вы успешно вошли!")
        } catch (e) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            mt: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'stretch',
                        }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            margin="normal"
                            required
                            id="email"
                            label="Электронная почта"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginData.email}
                            onChange={handleChange("email")}
                        />
                        <TextField
                            margin="normal"
                            required
                            name="password"
                            label="Пароль"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={loginData.password}
                            onChange={handleChange('password')}
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
                        {isError ? <Alert severity={"error"}>Неверная почта или пароль!</Alert> : null}
                        {errorAuth ? <Alert severity={"error"}>{errorAuth}</Alert> : null}
                        <LoadingButton
                            type="submit"
                            size={"large"}
                            endIcon={<LoginRounded/>}
                            variant="contained"
                            sx={{mt: 3, mb: 2, alignSelf: "center"}}
                            loading={isLoading}
                            loadingPosition="end"
                        >
                            Войти
                        </LoadingButton>
                        <Link
                            to={links.register}
                            variant="body2"
                            sx={{alignSelf: "center"}}
                            component={RouterLink}
                        >
                            {"Зарегистрироваться"}
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}