import {Avatar, Box, ListItem, ListItemAvatar, ListItemButton, Typography, useTheme} from "@mui/material";
import {getOperationIconByCategory} from "../utils";

export function OperationListItem({operation, onClick, account}) {
    const theme = useTheme()

    return (
        <ListItem key={operation.id} disablePadding>
            <ListItemButton
                onClick={onClick}
            >
                <ListItemAvatar>
                    <Avatar sx={{bgcolor: theme.palette.primary.main}}>
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
                        color: operation.type === 'EXPENSE' ? theme.palette.error.main : theme.palette.success.main
                    }}>{operation.type === 'EXPENSE' ? '-' : '+'}{operation.amount} ₽</Typography>
                </Box>
            </ListItemButton>
        </ListItem>
    )
}