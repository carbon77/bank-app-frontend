import {Button, CssBaseline, Grid, Paper, Stack, Typography} from "@mui/material";
import {useKeycloak} from "@react-keycloak/web";

export function AuthPage() {
    const {keycloak} = useKeycloak()

    async function onLoginClick() {
        await keycloak.login()
    }

    async function onRegisterClick() {
        await keycloak.register()
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
                    backgroundImage: 'url(https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
                <Stack sx={{
                    margin: '150px 50px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>

                    <Button onClick={onLoginClick} fullWidth color={"primary"} variant={"contained"}>Войти</Button>
                    <Button onClick={onRegisterClick} fullWidth color={"primary"}
                            variant={"contained"}>Регистрация</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}