import {Box, Button, CssBaseline, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import {LoginRounded} from "@mui/icons-material";
import {Link as RouterLink} from 'react-router-dom';

export function AuthPage() {
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
                    >
                        <TextField
                            margin="normal"
                            required
                            id="email"
                            label="Электронная почта"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            size={"large"}
                            endIcon={<LoginRounded/>}
                            variant="contained"
                            sx={{mt: 3, mb: 2, alignSelf: "center"}}
                        >
                            Войти
                        </Button>
                        <Link
                            to={"/auth/signup"}
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