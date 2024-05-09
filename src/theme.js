import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#546de5',
        },
        secondary: {
            main: '#63cdda',
        },
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#546de5',
        },
        secondary: {
            main: '#63cdda',
        },
    },
})
