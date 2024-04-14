import {Grid} from "@mui/material";
import {AccountSidebar} from "./AccountSidebar";

export const AccountSidebarTemplate = ({children}) => {
    return (
        <Grid container spacing={2} width={{md: '75%', xs: '90%'}} sx={{
            justifyContent: 'center'
        }}>
            <Grid item md={4} xs={2}>
                <AccountSidebar/>
            </Grid>
            <Grid item md={8} xs={10}>
                {children}
            </Grid>
        </Grid>
    )
}