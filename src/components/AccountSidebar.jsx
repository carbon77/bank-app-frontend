import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
    useTheme
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAccountsThunk} from "../store/accountSlice";
import {Alert} from "@mui/lab";
import {Add, CreditCard, CurrencyRuble, Savings} from "@mui/icons-material";
import {Link} from "react-router-dom";

export function AccountSidebar() {
    const accounts = useSelector(state => state.accounts.accounts)
    const dispatch = useDispatch()
    const [dispatchError, setDispatchError] = useState("")
    const theme = useTheme()

    function getAccountAvatarIcon(account) {
        if (account.accountType === 'CREDIT') {
            return <CreditCard/>
        } else if (account.accountType === 'SAVINGS') {
            return <Savings/>
        }
        return <CurrencyRuble/>
    }

    function getAccountTitle(account) {
        switch (account.accountType) {
            case 'CREDIT':
                return 'Кредитный'
            case 'SAVINGS':
                return 'Сберегательный'
            case 'CHECKING':
                return 'Расчётный'
        }
    }

    async function getAccounts() {
        try {
            await dispatch(getAccountsThunk())
        } catch (e) {
            setDispatchError(e.message)
        }
    }

    useEffect(() => {
        if (!accounts) {
            getAccounts()
        }
    }, [])

    if (dispatchError) {
        return <Alert severity={"error"}>{dispatchError}</Alert>
    }

    if (!accounts) {
        return <Paper elevation={2}>Загрузка...</Paper>
    }

    return (<Paper elevation={2} sx={{
        display: 'flex', flexDirection: 'column', borderRadius: '1em',
    }}>
        <Box sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.5em 2em',
        }}>
            <Typography fontSize={'1.4em'}>Счета</Typography>
            <IconButton
                color={"primary"}
                size={"large"}
                component={Link}
                to={"/accounts/create"}
            >
                <Add/>
            </IconButton>
        </Box>
        <List sx={{
            paddingX: '0'
        }}>
            {accounts.map(account => (
                <ListItem key={account.id} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={`/accounts/${account.id}`}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                {getAccountAvatarIcon(account)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${account.balance} ₽`} secondary={getAccountTitle(account)}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Paper>)
}