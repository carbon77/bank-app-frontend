import {Alert, Avatar, Box, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {AssignmentInd, LoginRounded} from "@mui/icons-material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {links} from "../../links";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {registerThunk} from "../../store/authSlice";
import {CustomPatternFormat} from "../../utils";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";
import {LoadingButton} from "@mui/lab";

function getFormattedDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

export const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: '',
        number: '',
        series: '',
        issueDate: getFormattedDate(),
        firstName: '',
        lastName: '',
        patronimic: '',
        departmentCode: '',
        birthday: getFormattedDate(),
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [emailValidationError, setEmailValidationError] = useState(null)
    const [passwordValidationError, setPasswordValidationError] = useState(null)
    const [loading, setLoading] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showSnackbar = useShowSnackbar()

    const onChangeHandler = field => e => {
        if (field === 'email') {
            setEmailValidationError(validateEmail(e.target.value) ? null : 'Некорректная почта')
        }

        if (field === 'password') {
            setPasswordValidationError(e.target.value === formData.passwordConfirm ? null : 'Пароли не совпадают')
        }

        if (field === 'passwordConfirm') {
            setPasswordValidationError(e.target.value === formData.password ? null : 'Пароли не совпадают')
        }

        return setFormData(formData => {
            return {
                ...formData,
                [field]: e.target.value,
            }
        })
    }

    const onSubmitHandle = async e => {
        e.preventDefault()

        if (passwordValidationError) {
            return false
        }

        if (emailValidationError) {
            return
        }

        for (const field of Object.keys(formData)) {
            if (formData[field] === '') {
                setErrorMessage(`Поле ${field} не заполнено!`)
                return false
            }
        }

        const registerData = {
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            passport: {
                number: formData.number,
                series: formData.series,
                issueDate: formData.issueDate,
                firstName: formData.firstName,
                lastName: formData.lastName,
                patronimic: formData.patronimic,
                departmentCode: formData.departmentCode,
            }
        }

        setLoading(true)
        try {
            await dispatch(registerThunk(registerData))
            showSnackbar("Вы успешно зарегистрировались! Теперь вы можете войти в аккаунт")
            navigate("/login")
        } catch (e) {
            setErrorMessage("Пользователь уже существует!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container component={"main"} sx={{
            width: {
                md: '40%',
                xs: '100%',
            },
        }}>
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                }}
            >
                <Avatar sx={{bgcolor: 'primary.main'}}>
                    <AssignmentInd/>
                </Avatar>
                <Typography component={"h1"} variant={"h5"} sx={{mb: 6}}>
                    Регистрация
                </Typography>

                <Box component={"form"} noValidate sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                }} onSubmit={onSubmitHandle}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                label="Имя"
                                autoFocus
                                size={"small"}
                                value={formData.firstName}
                                onChange={onChangeHandler('firstName')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                label="Фамилия"
                                size={"small"}
                                value={formData.lastName}
                                onChange={onChangeHandler('lastName')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                label="Отчество"
                                size={"small"}
                                value={formData.patronimic}
                                onChange={onChangeHandler('patronimic')}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <CustomPatternFormat
                                required
                                fullWidth
                                label={"Телефон"}
                                size={"small"}
                                value={formData.phoneNumber}
                                onChange={onChangeHandler('phoneNumber')}
                                format={"+# (###) ###-##-##"}
                                mask={"_"}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                error={emailValidationError}
                                helperText={emailValidationError}
                                required
                                fullWidth
                                label="Электронная почта"
                                type={"email"}
                                size={"small"}
                                value={formData.email}
                                onChange={onChangeHandler('email')}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Пароль"
                                type="password"
                                size={"small"}
                                value={formData.password}
                                onChange={onChangeHandler("password")}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Подтверждение пароля"
                                type="password"
                                size={"small"}
                                value={formData.passwordConfirm}
                                onChange={onChangeHandler("passwordConfirm")}
                            />
                        </Grid>

                        {passwordValidationError ? (
                            <Grid item xs={12}>
                                <Alert severity={"error"}>
                                    {passwordValidationError}
                                </Alert>
                            </Grid>
                        ) : null}

                        <Grid item xs={12}>
                            <Typography variant={'h6'} marginTop={'1em'}>Пасспортные данные</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <CustomPatternFormat
                                required
                                fullWidth
                                label="Серия"
                                size={"small"}
                                value={formData.series}
                                onChange={onChangeHandler("series")}
                                format={"## ##"}
                                mask={"_"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomPatternFormat
                                required
                                fullWidth
                                label="Номер"
                                size={"small"}
                                value={formData.number}
                                onChange={onChangeHandler("number")}
                                format={"######"}
                                mask={"_"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomPatternFormat
                                required
                                fullWidth
                                label="Код подразделения"
                                type="text"
                                size={"small"}
                                value={formData.departmentCode}
                                onChange={onChangeHandler("departmentCode")}
                                format={"###-###"}
                                mask={"_"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Дата выдачи"
                                type="date"
                                size={"small"}
                                value={formData.issueDate}
                                onChange={onChangeHandler("issueDate")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="День рождения"
                                type="date"
                                size={"small"}
                                value={formData.birthday}
                                onChange={onChangeHandler("birthday")}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{m: "1em 0"}}>
                        {!errorMessage ? null : (
                            <Alert severity={"error"}>
                                {errorMessage}
                            </Alert>
                        )}
                    </Box>

                    <LoadingButton
                        type="submit"
                        size={"large"}
                        endIcon={<LoginRounded/>}
                        variant="contained"
                        loading={loading}
                        loadingPosition="end"
                        fullWidth
                    >
                        Зарегистрироваться
                    </LoadingButton>
                    <Link
                        to={links.login}
                        variant="body2"
                        sx={{alignSelf: "center"}}
                        component={RouterLink}
                    >
                        {"Уже есть аккаунт? Войти"}
                    </Link>
                </Box>
            </Box>
        </Container>
    )
}