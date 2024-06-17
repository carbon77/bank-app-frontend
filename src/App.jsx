import {Router} from "./Router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {Provider} from "react-redux";
import {store} from "./store/index.ts";
import {SnackbarProvider} from "notistack";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import keycloak from "./auth/keycloak.ts";
import {ReactKeycloakProvider} from "@react-keycloak/web";

function App() {
    return (
        <div className="App">
            <ReactKeycloakProvider authClient={keycloak}>
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
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
