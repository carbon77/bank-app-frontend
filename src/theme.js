import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#d81b60',
        },
        secondary: {
            main: '#00bcd4',
        },
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#d81b60',
        },
        secondary: {
            main: '#00bcd4',
        },
    },
})
