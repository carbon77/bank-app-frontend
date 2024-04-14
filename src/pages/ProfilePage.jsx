import {useSelector} from "react-redux";
import {Avatar, Box, Container, CssBaseline, Grid, Paper, Typography} from "@mui/material";
import {GridBlock} from "../components/GridBlock";

export function ProfilePage() {
    const user = useSelector(state => state.auth.authorizedUser)

    function avatarString() {
        return user.firstName[0] + user.lastName[0]
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <CssBaseline/>
            <Grid container gap={2} width={{xs: '100%', md: '50%'}} sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Grid item component={GridBlock} sx={{
                    display: 'flex'
                }}>
                    <Box>
                        <Avatar>{avatarString()}</Avatar>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        direction: 'column'
                    }}>
                        <Typography>{user.firstName} {user.lastName}</Typography>
                    </Box>
                </Grid>
                <Grid item component={GridBlock}>
                    item 2
                </Grid>
                <Grid item component={GridBlock}>
                    item 3
                </Grid>
                <Grid item component={GridBlock}>
                    item 4
                </Grid>
            </Grid>
        </Container>
    )
}