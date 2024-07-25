import {createTheme, Theme} from "@mui/material";

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#546de5',
        },
        secondary: {
            main: '#63cdda',
        },
    },
})

export const darkTheme: Theme = createTheme({
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
