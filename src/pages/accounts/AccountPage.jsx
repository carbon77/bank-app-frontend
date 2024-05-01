import {useNavigate, useParams} from "react-router-dom";
import {Box, Chip, Grid, IconButton, Stack, Tab, Tabs, ThemeProvider, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createCardThunk, getAccountsThunk} from "../../store/accountSlice";
import {getAccountTitle, moneyInputFormatter} from "../../utils";
import {AccountDetailsPanel} from "../../components/AccountDetailsPanel";
import {AccountTariffPanel} from "../../components/AccountTariffPanel";
import {OperationsPieChartPanel} from "../../components/OperationsPieChartPanel";
import {CreateCardDialog} from "../../components/CreateCardDialog";
import {TopUpButtonPanel} from "../../components/TopUpButtonPanel";
import {WithdrawButtonPanel} from "../../components/WithdrawButtonPanel";
import {TransferButtonPanel} from "../../components/TransferButtonPanel";
import {Panel} from "../../components/Panel";
import {AccountPageName} from "../../components/AccountPageName";
import {darkTheme} from "../../theme";
import {Add, Block} from "@mui/icons-material";
import {OperationsBarChartPanel} from "../../components/OperationsBarChartPanel";

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
                <ThemeProvider theme={darkTheme}>
                    <Panel sx={{
                        border: '2px solid',
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.main',
                    }}>
                        <Stack>
                            <AccountPageName account={account}/>
                            <Typography>
                                {getAccountTitle(account.accountType)}
                            </Typography>
                            <Typography sx={{marginTop: '10px'}} variant={"h3"}>
                                {moneyInputFormatter(account.balance.toString())}
                            </Typography>
                            <Stack direction={"row"} spacing={1}>
                                {account.cards.map(card => (
                                    <Chip
                                        onClick={() => {
                                            navigate(`/cards/${card.id}`)
                                        }}
                                        label={card.number.slice(0, 4)}
                                        color={card.blocked ? "error" : "default"}
                                        sx={{
                                            borderRadius: '10px',
                                            fontSize: '1em',
                                        }}
                                        icon={card.blocked ? <Block fontSize={"small"}/> : <></>}
                                    />
                                ))}

                                {account.cards.length >= 5 ? null : (
                                    <IconButton
                                        size={"small"}
                                        onClick={() => {
                                            setCardDialogOpen(true)
                                        }}
                                    ><Add/></IconButton>
                                )}
                            </Stack>
                        </Stack>
                    </Panel>
                </ThemeProvider>
            </Grid>
            <Grid item md={4}>
                <Stack direction={"row"} spacing={1}>
                    <TopUpButtonPanel sx={{width: '100%'}}/>
                    <WithdrawButtonPanel sx={{width: '100%'}}/>
                    <TransferButtonPanel sx={{width: '100%'}}/>
                </Stack>
            </Grid>
            <Grid item container md={8} spacing={2}>
                <Grid item md={12}>
                    <OperationsPieChartPanel accountId={accountId}/>
                </Grid>
                <Grid item md={12}>
                    <OperationsBarChartPanel accountId={accountId}/>
                </Grid>
                <Grid item md={12}>
                    <Panel>
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
                    </Panel>
                </Grid>
            </Grid>

            <CreateCardDialog
                open={cardDialogOpen}
                onClose={() => setCardDialogOpen(false)}
                onSubmit={() => createCardHandle()}
            />
        </Grid>
    )
}