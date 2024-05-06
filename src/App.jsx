import {Router} from "./router/Router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {Provider} from "react-redux";
import {store} from "./store";
import {SnackbarProvider} from "notistack";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import locale from "dayjs/locale/ru";

function App() {
    return (
        <div className="App">
            <SnackbarProvider maxSnack={5} anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
            }}>
                <LocalizationProvider
                    adapterLocale={dayjs.locale('ru')}
                    dateAdapter={AdapterDayjs}
                >
                    <Provider store={store}>
                        <ThemeProvider theme={theme}>
                            <Router/>
                        </ThemeProvider>
                    </Provider>
                </LocalizationProvider>
            </SnackbarProvider>
        </div>
    );
}

export default App;
