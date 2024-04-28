import {Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, useTheme} from "@mui/material";

export function ButtonPanel({
                                onClick,
                                primaryText,
                                secondaryText = '',
                                icon = null,
                                ...props
                            }) {
    const theme = useTheme()

    return (
        <Paper {...props} elevation={2}>
            <List sx={{p: 0}}>
                <ListItem sx={{p: 0}}>
                    <ListItemButton onClick={onClick} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {icon ? (
                            <ListItemAvatar sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                                    {icon}
                                </Avatar>
                            </ListItemAvatar>
                        ) : null}
                        <ListItemText primary={primaryText} secondary={secondaryText}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Paper>
    )
}