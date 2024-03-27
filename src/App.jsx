import {Router} from "./router/Router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Router/>
                </ThemeProvider>
            </Provider>
        </div>
    );
}

export default App;
