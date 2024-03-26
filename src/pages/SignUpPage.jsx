import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {AssignmentInd, LoginRounded} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";

export const SignUpPage = () => {
    return (
        <Container component={"main"} maxWidth={"xs"}>
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    mt: 8
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
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Имя"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Фамилия"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id={"phone"}
                                label={"Телефон"}
                                name={"phone"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Электронная почта"
                                name="email"
                                type={"email"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type={"submit"}
                        variant={"contained"}
                        size={"large"}
                        endIcon={<LoginRounded/>}
                        fullWidth
                        sx={{mt: 3, mb: 2}}
                    >
                        Зарегистрироваться
                    </Button>
                    <Link
                        to={"/auth"}
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