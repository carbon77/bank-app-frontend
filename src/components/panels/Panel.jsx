import {Paper} from "@mui/material";

export function Panel({children, sx, ...props}) {
    return (
        <Paper elevation={2} sx={{
            p: '1em 2em',
            flex: 1,
            ...sx,
        }} {...props}>{children}</Paper>
    )
}