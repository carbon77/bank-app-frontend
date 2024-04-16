import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {Add, ArrowForward, Payment} from "@mui/icons-material";

export function AccountActionsGroup() {
    const actions = [
        {
            text: 'Оплатить',
            icon: <Payment color={"primary"} fontSize={"large"} />,
        },
        {
            text: 'Заплатить',
            icon: <Add color={"primary"} fontSize={"large"} />,
        },
        {
            text: 'Перевести',
            icon: <ArrowForward color={"primary"} fontSize={"large"} />,
        },
    ]

    return (
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
                        }}>
                            <ListItemIcon sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>{action.icon}</ListItemIcon>
                            <ListItemText>{action.text}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}