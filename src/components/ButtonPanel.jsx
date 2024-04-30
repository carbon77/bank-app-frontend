import {Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, useTheme} from "@mui/material";
import {Panel} from "./Panel";

export function ButtonPanel({
                                onClick,
                                primaryText,
                                secondaryText = '',
                                direction = 'column',
                                icon = null,
                                sx,
                                ...props
                            }) {
    const theme = useTheme()

    return (
        <Panel {...props} sx={{p: 0, textDecoration: 'none', ...sx}}>
            <List sx={{p: 0}}>
                <ListItem sx={{p: 0}}>
                    <ListItemButton onClick={onClick} sx={{
                        display: 'flex',
                        flexDirection: direction,
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
        </Panel>
    )
}