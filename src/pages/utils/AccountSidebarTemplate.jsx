import {Grid} from "@mui/material";
import {AccountSidebar} from "../../components/panels/AccountSidebar";

export const AccountSidebarTemplate = ({children}) => {
    return (
        <Grid container spacing={2} width={{md: '75%', xs: '90%'}} sx={{
            justifyContent: 'center'
        }}>
            <Grid item md={3} xs={2}>
                <AccountSidebar/>
            </Grid>
            <Grid item md={9} xs={10}>
                {children}
            </Grid>
        </Grid>
    )
}