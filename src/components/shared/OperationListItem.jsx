import {Avatar, Box, ListItem, ListItemAvatar, ListItemButton, Typography, useTheme} from "@mui/material";
import {getOperationIconByCategory, moneyInputFormatter} from "../../utils";

export function OperationListItem({operation, onClick, account}) {
    const theme = useTheme()

    return (
        <ListItem key={operation.id} disablePadding>
            <ListItemButton
                onClick={onClick}
                sx={{
                    borderRadius: '1em',
                }}
            >
                <ListItemAvatar>
                    <Avatar sx={{
                        bgcolor: operation.status === 'FAILED' ? theme.palette.error.main : theme.palette.primary.main
                    }}>
                        {getOperationIconByCategory(operation)}
                    </Avatar>
                </ListItemAvatar>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100vw',
                }}>
                    <div>
                        <Typography fontSize={"large"}>{operation.category.name}</Typography>
                        <Typography variant={"subtitle1"}
                                    fontSize={"small"}>{account.name}</Typography>
                    </div>
                    <Typography sx={{
                        color: operation.status === 'FAILED' ? theme.palette.error.main :
                            (operation.type === 'EXPENSE' ? '' : theme.palette.success.main),
                    }}>{operation.type === 'EXPENSE' ? '-' : '+'}
                        {moneyInputFormatter(operation.amount.toString())}</Typography>
                </Box>
            </ListItemButton>
        </ListItem>
    )
}