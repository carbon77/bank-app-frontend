import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {deleteCardThunk, getAccountsThunk} from "../store/accountSlice";
import {getAccountAvatarIcon} from "../utils";
import {Delete} from "@mui/icons-material";

export function CardPage() {
    const {cardId} = useParams()
    const accounts = useSelector(state => state.accounts.accounts)
    const [account, setAccount] = useState(null)
    const [card, setCard] = useState(null)
    const theme = useTheme()
    const dispatch = useDispatch()
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
        navigate(`/accounts/${account.id}?success_message=Карта успешно удалена`)
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
                <Paper elevation={2} sx={{
                    bgcolor: theme.palette.primary.main,
                    display: 'flex',
                    flexDirection: 'column',
                    p: '1em',
                    color: 'white',
                }}>
                    <Typography variant={"h4"}>{account.balance} ₽</Typography>
                    <Typography>{account.name}</Typography>
                </Paper>
            </Grid>
            <Grid item md={8}>
                <Paper elevation={2} sx={{
                    p: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <Typography variant={"h5"}>Реквизиты</Typography>
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
                </Paper>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item mdOffset={2} md={8}>
                <Paper elevation={2} sx={{
                    p: '15px',
                }}>
                    <Typography variant={"h5"} mb={'10px'}>Привязана к счёту</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                            {getAccountAvatarIcon(account.accountType)}
                        </Avatar>
                        <Link style={{textDecoration: 'none'}} to={`/accounts/${account.id}`}>{account.name}</Link>
                    </Box>
                </Paper>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item mdOffset={2} md={8}>
                <Paper elevation={2}>
                    <Typography variant={"h5"} p={'15px'} pb={'0'}>Действия</Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton disabled={account.cards.length === 1} onClick={deleteCardHandle}>
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                        <Delete/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Удалить`}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
        </Grid>
    )
}