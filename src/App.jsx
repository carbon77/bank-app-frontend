import {Router} from "./router/Router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {Provider} from "react-redux";
import {store} from "./store";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <div className="App">
            <SnackbarProvider maxSnack={5} anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
            }}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <Router/>
                    </ThemeProvider>
                </Provider>
            </SnackbarProvider>
        </div>
    );
}

export default App;
