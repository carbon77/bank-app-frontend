import {useSelector} from "react-redux"
import {Avatar, Grid, Paper, Stack, Typography, useTheme} from "@mui/material"
import {Person} from "@mui/icons-material";
import {PassportPanel} from "../components/panels/PassportPanel";
import {ProfileEmailPanel} from "../components/panels/ProfileEmailPanel";
import {ProfilePhonePanel} from "../components/panels/ProfilePhonePanel";
import {RouterBreadcrumb} from "../components/shared/RouterBreadcrumb";

export function ProfilePage() {
    const user = useSelector(state => state.auth.authorizedUser)
    const theme = useTheme()

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <RouterBreadcrumb/>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <Stack spacing={2} direction={"row"} alignItems={"center"} padding={"2em"}>
                                <Avatar sx={{
                                    bgcolor: theme.palette.primary.main,
                                    height: 100,
                                    width: 100,
                                }}><Person sx={{fontSize: 60}}/></Avatar>
                                <Stack>
                                    <Typography variant={"h4"}>{user.passport.firstName}</Typography>
                                    <Typography
                                        variant={"h4"}>{user.passport.patronimic} {user.passport.lastName[0]}.</Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <ProfileEmailPanel user={user}/>
                    </Grid>

                    <Grid item xs={12}>
                        <ProfilePhonePanel user={user}/>
                    </Grid>

                    <Grid item xs={12}>
                        <PassportPanel passport={user.passport}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}