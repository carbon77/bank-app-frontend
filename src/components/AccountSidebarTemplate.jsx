import {Grid} from "@mui/material";
import {AccountSidebar} from "./AccountSidebar";

export const AccountSidebarTemplate = ({children}) => {
    return (
        <Grid container spacing={2} width={{md: '70%'}} sx={{
            justifyContent: 'center'
        }}>
            <Grid item md={3}>
                <AccountSidebar/>
            </Grid>
            <Grid item md={9}>
                {children}
            </Grid>
        </Grid>
    )
}