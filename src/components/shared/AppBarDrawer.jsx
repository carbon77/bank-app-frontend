import {
    Avatar,
    Box,
    CircularProgress,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme
} from "@mui/material";
import {Link as RouterLink, Link} from "react-router-dom";
import {links} from "../../links";
import {AccountCircle, Add, CreditCard, ExpandLess, ExpandMore, Home, Logout} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {useAccounts} from "../../hooks/useAccounts";
import {getAccountAvatarIcon, getAccountTitle, moneyInputFormatter} from "../../utils";
import {useState} from "react";

export function AppBarDrawer({
                                 open,
                                 onClose,
                                 onLogoutClick,
                                 pages,
                             }) {
    const {accounts, loading, error} = useAccounts()
    const user = useSelector(state => state.auth.authorizedUser)
    const [openProfileList, setOpenProfileList] = useState(false)
    const [openAccountList, setOpenAccountList] = useState(false)
    const theme = useTheme()

    return (
        <Drawer anchor={"right"} open={open} onClose={onClose}>
            <Box
                sx={{
                    minWidth: '60dvw',
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                }}
            >
                <List sx={{color: 'primary.main'}}>

                    {pages.map(({name, to, icon}) => (
                        <ListItem key={name} sx={{p: 0}}>
                            <ListItemButton component={Link} to={to}>
                                <ListItemIcon sx={{color: 'primary.main'}}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={name}/>
                            </ListItemButton>
                        </ListItem>
                    ))}

                    <Divider/>

                    <ListItem sx={{p: 0}}>
                        <ListItemButton onClick={() => setOpenProfileList(!openProfileList)}>
                            <ListItemIcon>
                                <AccountCircle sx={{color: "primary.main"}}/>
                            </ListItemIcon>
                            <ListItemText primary={`${user.passport.firstName} ${user.passport.lastName}`}/>
                            {openProfileList ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                    </ListItem>

                    <Collapse in={openProfileList}>
                        <ListItemButton sx={{pl: 4}} component={RouterLink} to={links.profile}>
                            <ListItemIcon>
                                <Home sx={{color: "primary.main"}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Профиль"}/>
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}} onClick={onLogoutClick}>
                            <ListItemIcon>
                                <Logout sx={{color: "primary.main"}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Выйти"}/>
                        </ListItemButton>
                    </Collapse>

                    <Divider/>
                    <ListItem sx={{p: 0}}>
                        <ListItemButton onClick={() => setOpenAccountList(!openAccountList)}>
                            <ListItemIcon>
                                <CreditCard sx={{color: "primary.main"}}/>
                            </ListItemIcon>
                            <ListItemText primary={'Счета'}/>
                            {openAccountList ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                    </ListItem>

                    <Collapse in={openAccountList}>
                        <ListItemButton
                            component={Link}
                            to={`/accounts/create`}
                            sx={{pl: 4}}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                    <Add/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={"Открыть новый счёт"}
                            />
                        </ListItemButton>
                        {loading ? <CircularProgress/> : accounts.filter(acc => !acc.closed).map(account => (
                            <ListItemButton
                                component={Link}
                                to={`/accounts/${account.id}`}
                                key={account.id}
                                sx={{pl: 4}}
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
                        ))}
                    </Collapse>
                </List>
            </Box>
        </Drawer>
    )
}