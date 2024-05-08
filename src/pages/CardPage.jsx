import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Alert, Grid, Stack, TextField, ThemeProvider, Typography} from "@mui/material";
import {deleteCardThunk, getAccountsThunk, patchCardThunk} from "../store/accountSlice";
import {getAccountAvatarIcon, moneyInputFormatter} from "../utils";
import {Delete, Lock, LockOpen} from "@mui/icons-material";
import {Panel} from "../components/panels/Panel";
import {darkTheme} from "../theme";
import {ButtonPanel} from "../components/panels/ButtonPanel";
import {useShowSnackbar} from "../hooks/useShowSnackbar";

export function CardPage() {
    const {cardId} = useParams()
    const accounts = useSelector(state => state.accounts.accounts)
    const [account, setAccount] = useState(null)
    const [card, setCard] = useState(null)
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()
    const navigate = useNavigate()

    function convertDateFormat(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear() % 100; // Get only the last two digits of the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Increment month by 1 since it is zero-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }

    async function getAccounts() {
        try {
            await dispatch(getAccountsThunk())
        } catch (e) {
            console.error(e.message)
        }
    }

    async function deleteCardHandle() {
        await dispatch(deleteCardThunk({
            accountId: account.id,
            cardId: card.id,
        }))
        await dispatch(getAccountsThunk())
        navigate(`/accounts/${account.id}`)
        showSnackbar("Карта удалена")
    }

    async function blockCardHandle() {
        await dispatch(patchCardThunk({
            accountId: account.id,
            cardId: card.id,
            data: {
                blocked: !card.blocked,
            }
        }))
        await dispatch(getAccountsThunk())
        showSnackbar("Карта " + (card.blocked ? "разблокирована" : "заблокирована"), "info")
    }

    useEffect(() => {
        if (!accounts) {
            getAccounts()
        }
    }, [])

    useEffect(() => {
        if (!accounts) {
            return
        }

        for (const account of accounts) {
            for (const card of account.cards) {
                if (card.id === +cardId) {
                    setAccount(account)
                    setCard(card)
                }
            }
        }
    }, [accounts])

    if (!accounts || !account || !card) {
        return <div>Loading...</div>
    }

    return (
        <Grid container width={{md: '60%'}} spacing={2}>
            <Grid item md={4}>
                <Stack spacing={2}>
                    <ThemeProvider theme={darkTheme}>
                        <Panel sx={{
                            bgcolor: 'primary.main',
                        }}>
                            <Stack spacing={1}>
                                <Typography
                                    variant={"h4"}>{moneyInputFormatter(account.balance.toString())}</Typography>
                                <Typography>{account.name}</Typography>
                            </Stack>
                        </Panel>
                    </ThemeProvider>
                    {card.blocked ? (
                        <Alert severity={"warning"}>
                            Карта заблокирована!
                        </Alert>
                    ) : null}
                </Stack>
            </Grid>
            <Grid item md={8}>
                <Panel>
                    <Typography variant={"h5"} mb={2}>Реквизиты</Typography>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <TextField
                                fullWidth
                                variant={"outlined"}
                                value={card.number.replace(/\D/g, '').match(/.{1,4}/g).join(' ')}
                                label={"Номер карты"}
                                readOnly
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                fullWidth
                                variant={"outlined"}
                                value={convertDateFormat(card.expirationDate)}
                                label={"Срок действия"}
                                readOnly
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                fullWidth
                                variant={"outlined"}
                                value={card.svv}
                                label={"SVV"}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                </Panel>
            </Grid>
            <Grid item md={4}>
            </Grid>
            <Grid item mdOffset={2} md={8}>
                <Typography variant={"h5"} mb={2}>Привязана к счёту</Typography>
                <Stack spacing={2}>
                    <ButtonPanel
                        component={Link}
                        to={`/accounts/${account.id}`}
                        direction={"row"}
                        primaryText={account.name}
                        icon={getAccountAvatarIcon(account.accountType)}
                    />
                </Stack>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item mdOffset={2} md={8}>
                <Typography variant={"h5"} mb={2}>Действия</Typography>
                <Stack spacing={2}>
                    <ButtonPanel
                        direction={"row"}
                        primaryText={card.blocked ? `Разблокировать` : 'Заблокировать'}
                        icon={card.blocked ? <LockOpen/> : <Lock/>}
                        onClick={blockCardHandle}
                    />
                    <ButtonPanel
                        direction={"row"}
                        primaryText={'Удалить'}
                        icon={<Delete/>}
                        onClick={deleteCardHandle}
                        disabled={account.cards.length === 1}
                    />
                </Stack>
            </Grid>
        </Grid>
    )
}