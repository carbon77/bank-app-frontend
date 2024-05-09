import {
    AppBar,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {AccountBalance, AccountCircle, History, Home, Logout, Menu as MenuIcon, Payments} from "@mui/icons-material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {links} from "../../links";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/authSlice";
import {clearAccounts} from "../../store/accountSlice";
import {clearOperations} from "../../store/operationSlice";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";
import {AppBarDrawer} from "./AppBarDrawer";

const LogoutDialog = ({open, handleCancel, handleAccept}) => {
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
        >
            <DialogTitle>Выход</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы действительно хотите выйти?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"outlined"} onClick={handleCancel}>Отмена</Button>
                <Button variant={"contained"} color={"error"} onClick={handleAccept}>Выйти</Button>
            </DialogActions>
        </Dialog>
    )
}

export function BankAppBar() {
    const pages = [
        {
            name: 'Главная',
            to: links.home,
            icon: <AccountBalance/>,
        },
        {
            name: 'Платежи и переводы',
            to: links.payments,
            icon: <Payments/>,
        },
        {
            name: 'Операции',
            to: links.operations,
            icon: <History/>,
        },
    ]
    const [showDrawer, setShowDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.authorizedUser)
    const showSnackbar = useShowSnackbar()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogoutDialogCancel() {
        setIsLogoutDialogOpen(false)
    }

    function handleLogout() {
        dispatch(logout())
        dispatch(clearAccounts())
        dispatch(clearOperations())
        navigate(links.login, {replace: true})
        showSnackbar("Вы успешно вышли!")
    }

    function handleLogoutMenuClick() {
        setIsLogoutDialogOpen(true)
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <AppBar
            position={"fixed"}
            sx={{
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
                boxShadow: 0,
            }}>
            <LogoutDialog
                open={isLogoutDialogOpen}
                handleAccept={handleLogout}
                handleCancel={handleLogoutDialogCancel}
            />
            <Container maxWidth={"lg"}>
                <Toolbar sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    borderRadius: '999px',
                    bgcolor:
                        theme.palette.mode === 'light'
                            ? 'rgba(255, 255, 255, 0.4)'
                            : 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow:
                        theme.palette.mode === 'light'
                            ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                            : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                })}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <AccountBalance
                            sx={{
                                display: 'flex',
                                color: 'primary.main',
                            }}
                        />
                        <Typography
                            variant={"h6"}
                            noWrap
                            component="a"
                            sx={{
                                display: 'flex',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            WaveBank
                        </Typography>
                    </Stack>

                    <Box sx={{ml: 3, flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map(({name, to}) => (
                            <Button
                                key={name}
                                component={RouterLink}
                                to={to}
                                size={'large'}
                                sx={{
                                    borderRadius: '999px',
                                    textTransform: 'none',
                                }}
                            >
                                {name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{
                        display: {
                            xs: 'none',
                            md: 'flex',
                        }
                    }}>
                        <Button
                            onClick={handleMenu}
                            size={'large'}
                            variant={"contained"}
                            sx={{
                                borderRadius: '999px',
                                textTransform: 'none',
                            }}
                            startIcon={<AccountCircle/>}
                        >
                            {`${user.passport.firstName}`}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={!!anchorEl}
                            onClose={handleClose}
                        >
                            <MenuItem
                                component={RouterLink}
                                to={links.profile}
                            >
                                <ListItemIcon>
                                    <Home sx={{color: "primary.main"}}/>
                                </ListItemIcon>
                                Профиль
                            </MenuItem>
                            <MenuItem onClick={handleLogoutMenuClick}>
                                <ListItemIcon>
                                    <Logout sx={{color: "primary.main"}}/>
                                </ListItemIcon>
                                Выйти
                            </MenuItem>
                        </Menu>
                    </Box>


                    <Box sx={{
                        display: {
                            md: 'none',
                            xs: 'flex',
                        }
                    }}>
                        <IconButton
                            variant="text"
                            color="primary"
                            onClick={() => setShowDrawer(!showDrawer)}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <AppBarDrawer
                            open={showDrawer}
                            onClose={() => setShowDrawer(!showDrawer)}
                            onLogoutClick={handleLogoutMenuClick}
                            pages={pages}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}