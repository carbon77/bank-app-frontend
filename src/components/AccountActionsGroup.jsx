import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {Add, Payment, SwapHoriz} from "@mui/icons-material";
import {useState} from "react";
import {WithdrawAccountModal} from "./WithdrawAccountModal";
import {TopUpAccountModal} from "./TopUpAccountModal";
import {TransferAccountModal} from "./TransferAccountModal";

export function AccountActionsGroup({ accountId }) {
    const [withdrawOpen, setWithdrawOpen] = useState(false)
    const [topUpOpen, setTopUpOpen] = useState(false)
    const [transferOpen, setTransferOpen] = useState(false)
    const actions = [
        {
            text: 'Снять',
            icon: <Payment color={"primary"} fontSize={"large"}/>,
            onClick: () => {
                setWithdrawOpen(true)
            },
        },
        {
            text: 'Пополнить',
            icon: <Add color={"primary"} fontSize={"large"}/>,
            onClick: () => {
                setTopUpOpen(true)
            },
        },
        {
            text: 'Перевести',
            icon: <SwapHoriz color={"primary"} fontSize={"large"}/>,
            onClick: () => {
                setTransferOpen(true)
            },
        },
    ]

    return (
        <>
            <Paper elevation={2} sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    {actions.map(action => (
                        <ListItem key={action.text} disablePadding>
                            <ListItemButton sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }} onClick={action.onClick}>
                                <ListItemIcon sx={{
                                    display: 'flex',
                                    justifyContent:  'center',
                                }}>{action.icon}</ListItemIcon>
                                <ListItemText>{action.text}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <WithdrawAccountModal
                open={withdrawOpen}
                onClose={() => setWithdrawOpen(false)}
                accountId={accountId}
            />
            <TopUpAccountModal
                open={topUpOpen}
                onClose={() => setTopUpOpen(false)}
                accountId={accountId}
            />
            <TransferAccountModal
                open={transferOpen}
                onClose={() => setTransferOpen(false)}
            />
        </>
    )
}