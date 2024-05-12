import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    Alert,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {deleteCardThunk, getAccountsThunk, patchCardThunk} from "../store/accountSlice";
import {getAccountAvatarIcon, moneyInputFormatter} from "../utils";
import {ContentCopy, Delete, Lock, LockOpen, Visibility, VisibilityOff} from "@mui/icons-material";
import {Panel} from "../components/panels/Panel";
import {darkTheme} from "../theme";
import {ButtonPanel} from "../components/panels/ButtonPanel";
import {useShowSnackbar} from "../hooks/useShowSnackbar";
import {useAccounts} from "../hooks/useAccounts";
import {useState} from "react";

export function CardPage() {
    const {cardId} = useParams()
    const {accounts, error, loading} = useAccounts()
    const account = accounts?.find(acc => acc.cards.map(c => c.id).includes(+cardId))
    const card = account?.cards.find(c => c.id === +cardId)
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()
    const navigate = useNavigate()
    const [showData, setShowData] = useState(false)

    function convertDateFormat(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear() % 100; // Get only the last two digits of the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Increment month by 1 since it is zero-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
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

    function copyFieldHandler(text) {
        return e => {
            navigator.clipboard.writeText(text)
            showSnackbar("Скопировано", "info")
        }
    }

    if (loading) {
        return <CircularProgress/>
    }

    if (error) {
        return <Alert severity={"error"}>{error}</Alert>
    }

    if (!account || account.closed || !card) {
        return <Alert severity={"error"}>Не удалось найти карту</Alert>
    }

    return (
        <Grid container width={{md: '60%', xs: '95%'}} spacing={2}>
            <Grid item md={4} xs={12}>
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
            <Grid item md={8} xs={12}>
                <Panel>
                    <Stack mb={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant={"h5"}>Реквизиты</Typography>
                        <IconButton onClick={() => setShowData(!showData)}>
                            {showData ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    type={showData ? 'text' : 'password'}
                                    variant={"outlined"}
                                    value={card.number.replace(/\D/g, '').match(/.{1,4}/g).join(' ')}
                                    label={"Номер карты"}
                                    readOnly
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={copyFieldHandler(card.number)}
                                                            disabled={!showData}>
                                                    <ContentCopy/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                type={showData ? 'text' : 'password'}
                                variant={"outlined"}
                                value={convertDateFormat(card.expirationDate)}
                                label={"Срок действия"}
                                readOnly
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={copyFieldHandler(convertDateFormat(card.expirationDate))}
                                                disabled={!showData}>
                                                <ContentCopy/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                type={showData ? 'text' : 'password'}
                                variant={"outlined"}
                                value={card.svv}
                                label={"SVV"}
                                readOnly
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={copyFieldHandler(card.svv)} disabled={!showData}>
                                                <ContentCopy/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                </Panel>
            </Grid>
            <Grid item md={4} sx={{display: {md: 'flex', xs: 'none'}}}>
            </Grid>
            <Grid item mdOffset={2} md={8} xs={12}>
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
            <Grid item md={4} sx={{display: {md: 'flex', xs: 'none'}}}></Grid>
            <Grid item mdOffset={2} md={8} xs={12}>
                <Typography variant={"h5"} mb={2}>Действия</Typography>
                <Stack spacing={2} direction={{
                    md: 'column',
                    xs: 'row',
                }}>
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