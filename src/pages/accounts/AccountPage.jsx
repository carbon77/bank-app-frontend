import {useNavigate, useParams} from "react-router-dom";
import {Box, Chip, Grid, Paper, Stack, Tab, Tabs, Typography, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createCardThunk, getAccountsThunk} from "../../store/accountSlice";
import {AccountActionsGroup} from "../../components/AccountActionsGroup";
import {getAccountTitle} from "../../utils";
import {AccountDetailsPanel} from "../../components/AccountDetailsPanel";
import {AccountTariffPanel} from "../../components/AccountTariffPanel";
import {OperationsPanel} from "../../components/OperationsPanel";
import {OperationsPieChartPanel} from "../../components/OperationsPieChartPanel";
import {CreateCardDialog} from "../../components/CreateCardDialog";

const TabPanel = ({
                      children, value, index
                  }) => (
    <Box
        hidden={value !== index}
        sx={{
            margin: '1.5em .5em',
        }}
    >
        {children}
    </Box>
)

export function AccountPage() {
    const {accountId} = useParams()
    const accounts = useSelector(state => state.accounts.accounts)
    const account = useSelector(state => state.accounts.accounts?.find(account => account.id === +accountId))
    const user = useSelector(state => state.auth.authorizedUser)
    const [detailsTab, setDetailsTab] = useState(0)
    const [cardDialogOpen, setCardDialogOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()

    async function getAccounts() {
        try {
            await dispatch(getAccountsThunk())
        } catch (e) {
            console.error(e.message)
        }
    }

    async function createCardHandle() {
        await dispatch(createCardThunk({accountId}))
        await dispatch(getAccountsThunk())
        setCardDialogOpen(false)
    }

    useEffect(() => {
        if (!accounts) {
            getAccounts()
        }
    }, [])

    if (!accounts || !user) {
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
                        <Stack direction={"row"} spacing={1}>
                            {account.cards.map(card => (
                                <Chip
                                    onClick={() => {
                                        navigate(`/cards/${card.id}`)
                                    }}
                                    label={card.number.slice(0, 4)}
                                    sx={{
                                        color: theme.palette.primary.main,
                                        background: 'white',
                                        borderRadius: '10px',
                                        fontSize: '1em',
                                        '&:hover': {
                                            background: 'lightgrey',
                                        },
                                    }}
                                />
                            ))}
                            <Chip
                                onClick={() => {
                                    setCardDialogOpen(true)
                                }}
                                label={"+"}
                                sx={{
                                    color: theme.palette.primary.main,
                                    background: 'white',
                                    borderRadius: '10px',
                                    fontSize: '1em',
                                    '&:hover': {
                                        background: 'lightgrey',
                                    },
                                }}
                            />
                            <CreateCardDialog
                                open={cardDialogOpen}
                                onClose={() => setCardDialogOpen(false)}
                                onSubmit={() => createCardHandle()}
                            />
                        </Stack>
                    </Box>
                </Paper>
            </Grid>
            <Grid item md={4}>
                <AccountActionsGroup accountId={accountId}/>
            </Grid>
            <Grid item container md={8} spacing={2}>
                <Grid item md={12}>
                    <OperationsPieChartPanel accounts={accounts} accountId={accountId}/>
                </Grid>
                <Grid item md={12}>
                    <OperationsPanel accounts={accounts} accountId={accountId}/>
                </Grid>
                <Grid item md={12}>
                    <Paper elevation={2} sx={{
                        padding: '1em'
                    }}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={detailsTab} onChange={(event, newValue) => setDetailsTab(newValue)}>
                                <Tab label={"Детали счёта"}/>
                                <Tab label={"Реквизиты"}/>
                            </Tabs>
                        </Box>
                        <TabPanel value={detailsTab} index={0}>
                            <AccountTariffPanel user={user} account={account}/>
                        </TabPanel>
                        <TabPanel value={detailsTab} index={1}>
                            <AccountDetailsPanel user={user} account={account}/>
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}