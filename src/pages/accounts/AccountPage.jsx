import {useParams} from "react-router-dom";
import {Box, Grid, Paper, Tab, Tabs, Typography, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAccountsThunk} from "../../store/accountSlice";
import {AccountActionsGroup} from "../../components/AccountActionsGroup";
import {getAccountTitle} from "../../utils";
import {AccountDetailsPanel} from "../../components/AccountDetailsPanel";

const TabPanel = ({
    children, value, index
}) => (
    <Box
        hidden={value !== index}
        sx={{
            margin: '.5em',
        }}
    >
        {children}
    </Box>
)

export function AccountPage() {
    const {accountId} = useParams()
    const accounts = useSelector(state => state.accounts.accounts)
    const account = useSelector(state => state.accounts.accounts?.find(account => account.id === +accountId))
    const dispatch = useDispatch()
    const theme = useTheme()
    const [detailsTab, setDetailsTab] = useState(0)

    async function getAccounts() {
        try {
            await dispatch(getAccountsThunk())
        } catch (e) {
            console.error(e.message)
        }
    }

    useEffect(() => {
        if (!accounts) {
            getAccounts()
        }
    }, [])

    if (!accounts) {
        return <div>Loading...</div>
    }

    return (
        <Grid container width={{md: '80%'}} spacing={2}>
            <Grid item md={12}>
                <Paper elevation={2} sx={{
                    padding: '1em 2em',
                    border: '2px solid',
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.main,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                    }}>
                        <Typography variant={"h5"}>
                            {account.name}
                        </Typography>
                        <Typography>
                            {getAccountTitle(account.accountType)}
                        </Typography>
                        <Typography sx={{marginTop: '10px'}} variant={"h3"}>
                            {account.balance} ₽
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item md={4}>
                <AccountActionsGroup/>
            </Grid>
            <Grid item container md={8} spacing={2}>
                <Grid item md={12}>
                    <Paper elevation={2} sx={{
                        padding: '2em'
                    }}>
                        Операции
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper elevation={2} sx={{
                        padding: '1em'
                    }}>
                        <Typography variant={"h5"} sx={{
                            margin: '0 0 .5em .5em'
                        }}>Детали счёта</Typography>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={detailsTab} onChange={(event, newValue) => setDetailsTab(newValue)}>
                                <Tab label={"Реквизиты"}/>
                                <Tab label={"Тариф"}/>
                            </Tabs>
                        </Box>
                        <TabPanel value={detailsTab} index={0}>
                            <AccountDetailsPanel details={account.accountDetails} />
                        </TabPanel>
                        <TabPanel value={detailsTab} index={1}>
                            Тариф
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}