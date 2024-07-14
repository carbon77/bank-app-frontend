import { Container, Grid, Typography } from "@mui/material"
import { RouterBreadcrumb } from "../components/shared/RouterBreadcrumb"
import { Panel } from "../components/panels/Panel"
import React from 'react'

export function ChatPage() {
    return (
        <Container sx={{
            maxWidth: { md: '60%', xs: '95%' }
        }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Panel>
                        <Typography>Chats</Typography>
                    </Panel>
                </Grid>
                <Grid item xs={8}>
                    <Panel>
                        <Typography>Chat Page</Typography>
                    </Panel>
                </Grid>
            </Grid>
        </Container>
    )
}