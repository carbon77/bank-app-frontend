import {Box, Button} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export function AppBarPages({pages}: {
    pages: {
        name: string,
        to: string,
        icon?: JSX.Element,
    }[]
}) {
    return (
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
    )
}