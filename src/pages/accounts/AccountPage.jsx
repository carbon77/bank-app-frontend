import {useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    Avatar,
    Box,
    Chip,
    Grid,
    IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    ThemeProvider,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {createCardThunk, getAccountsThunk, patchAccountThunk} from "../../store/accountSlice";
import {getAccountTitle, moneyInputFormatter} from "../../utils";
import {AccountDetailsPanel} from "../../components/panels/AccountDetailsPanel";
import {AccountTariffPanel} from "../../components/panels/AccountTariffPanel";
import {OperationsPieChartPanel} from "../../components/panels/OperationsPieChartPanel";
import {CreateCardDialog} from "../../components/forms/CreateCardDialog";
import {TopUpButtonPanel} from "../../components/panels/TopUpButtonPanel";
import {WithdrawButtonPanel} from "../../components/panels/WithdrawButtonPanel";
import {TransferButtonPanel} from "../../components/panels/TransferButtonPanel";
import {Panel} from "../../components/panels/Panel";
import {AccountPageName} from "../../components/shared/AccountPageName";
import {darkTheme} from "../../theme";
import {Add, Block, DeleteForever} from "@mui/icons-material";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";

const TabPanel = ({
                      children, value, index
                  }) => (
    <Box
        hidden={value !== index}
        sx={{
            marginTop: '1em',
        }}
    >
        {children}
    </Box>
)

export function AccountPage() {
    const {accountId} = useParams()
    const accountIds = useMemo(() => [accountId], [accountId])
    const accounts = useSelector(state => state.accounts.accounts)
    const account = useSelector(state => state.accounts.accounts?.find(account => account.id === +accountId))
    const user = useSelector(state => state.auth.authorizedUser)
    const [detailsTab, setDetailsTab] = useState(0)
    const [cardDialogOpen, setCardDialogOpen] = useState(false)
    const showSnackbar = useShowSnackbar()
    const isClosable = useMemo(() => {
        if (!account) {
            return false
        }

        if (account.closed) {
            return false
        }

        if (account.accountType === 'CREDIT' && account.balance >= account.accountLimit) {
            return true
        }

        return account.balance <= 0
    }, [account])
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

    async function handleCloseAccount() {
        await dispatch(patchAccountThunk({
            accountId,
            data: {
                closed: !account.closed
            },
        }))
        await dispatch(getAccountsThunk())
        showSnackbar("Счёт закрыт")
        navigate("/")
    }

    useEffect(() => {
        if (!accounts) {
            getAccounts()
        }
    }, [])

    if (!accounts || !user) {
        return <div>Loading...</div>
    }

    if (account.closed) {
        return <Alert severity={'error'}>Счёт закрыт!</Alert>
    }

    return (
        <Grid container width={{md: '80%', xs: '95%'}} spacing={2}>
            <Grid item xs={12}>
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
                                        key={card.id}
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
            <Grid item md={4} xs={12}>
                <Stack direction={"row"} spacing={1}>
                    <TopUpButtonPanel/>
                    <WithdrawButtonPanel/>
                    <TransferButtonPanel/>
                </Stack>
            </Grid>
            <Grid item container md={8} xs={12} spacing={2}>
                <Grid item xs={12}>
                    <OperationsPieChartPanel
                        accountIds={accountIds}
                        link={`/operations/analytics?accountIds=${accountId}`}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Panel>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={detailsTab} onChange={(event, newValue) => setDetailsTab(newValue)}>
                                <Tab label={"Детали счёта"}/>
                                <Tab label={"Реквизиты"}/>
                                <Tab label={"Действия"}/>
                            </Tabs>
                        </Box>
                        <TabPanel value={detailsTab} index={0}>
                            <AccountTariffPanel user={user} account={account}/>
                        </TabPanel>
                        <TabPanel value={detailsTab} index={1}>
                            <AccountDetailsPanel user={user} account={account}/>
                        </TabPanel>
                        <TabPanel value={detailsTab} index={2}>
                            <List sx={{p: 0}}>
                                <ListItemButton
                                    onClick={handleCloseAccount}
                                    disabled={!isClosable}
                                    sx={{
                                        borderRadius: '1em',
                                    }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{
                                            bgcolor: 'primary.main',
                                        }}>
                                            <DeleteForever/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={"Закрыть счёт"}
                                    />
                                </ListItemButton>
                            </List>
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