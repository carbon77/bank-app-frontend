import {Alert, CircularProgress, Grid} from "@mui/material";
import {AccountSidebar} from "../../components/panels/AccountSidebar";
import {useAccounts} from "../../hooks/useAccounts";

export const AccountSidebarTemplate = ({children}) => {
    const {
        accounts,
        error,
        loading,
    } = useAccounts()

    return (
        <Grid container spacing={2} width={{md: '75%', xs: '90%'}} sx={{
            justifyContent: 'center'
        }}>
            {loading ? <CircularProgress/> : (error ? <Alert severity={"error"}>{error}</Alert> : <>
                <Grid item md={3} sx={{
                    display: {md: 'block', xs: 'none'}
                }}>
                    <AccountSidebar/>
                </Grid>
                <Grid item md={9} xs={12}>
                    {children}
                </Grid>
            </>)}
        </Grid>
    )
}