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
import {useSelector} from "react-redux";
import {Add} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {getAccountAvatarIcon, getAccountTitle, moneyInputFormatter} from "../../utils";

export function AccountSidebar() {
    const accounts = useSelector(state => state.accounts.accounts)
    const theme = useTheme()

    return (<Paper elevation={2} sx={{
        display: 'flex', flexDirection: 'column',
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
            {accounts.filter(account => !account.closed).map(account => (
                <ListItem key={account.id} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={`/accounts/${account.id}`}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                {getAccountAvatarIcon(account.accountType)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={moneyInputFormatter(account.balance.toString())}
                            secondary={`${account.name} · ${getAccountTitle(account.accountType)}`}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Paper>)
}