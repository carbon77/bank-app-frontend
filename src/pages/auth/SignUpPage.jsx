import {Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {AssignmentInd, LoginRounded} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import {links} from "../../links";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {registerThunk} from "../../store/authSlice";
import {CustomPatternFormat} from "../../utils";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";

function getFormattedDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const SignUpPage = () => {
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()

    const onChangeHandler = field => e => {
        return setFormData(formData => {
            return {
                ...formData,
                [field]: e.target.value,
            }
        })
    }

    const onSubmitHandle = async e => {
        e.preventDefault()

        if (formData.password !== passwordConfirm) {
            setErrorMessage("Пароли не совпадают!")
            return false
        }

        for (const field of Object.keys(formData)) {
            if (formData[field] === '') {
                setErrorMessage(`Поле ${field} не может быть пустым!`)
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

        try {
            await dispatch(registerThunk(registerData))
            showSnackbar("Вы успешно зарегистрировались! Теперь вы можете войти в аккаунт")
        } catch (e) {
            setErrorMessage("Пользователь уже существует!")
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
                                value={passwordConfirm}
                                onChange={e => setPasswordConfirm(e.target.value)}
                            />
                        </Grid>

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


                    <Button
                        type={"submit"}
                        variant={"contained"}
                        size={"large"}
                        endIcon={<LoginRounded/>}
                        fullWidth
                        sx={{mb: 2}}
                    >
                        Зарегистрироваться
                    </Button>
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