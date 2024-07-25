import React from 'react'
import {Button, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import {Panel} from "../../components/panels/Panel"

export function AdminPage() {
    return (
        <Grid container maxWidth={{
            md: '70%',
            xs: '90%',
        }} spacing={2}>
            <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                    <Button variant={"outlined"} color={"primary"}>Payment categories</Button>
                    <Button variant={"outlined"} color={"primary"}>Payment infos</Button>
                </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
                <Panel>
                    <Typography>Admin</Typography>
                </Panel>
            </Grid>
        </Grid>
    )
}