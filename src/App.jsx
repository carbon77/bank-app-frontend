import {Router} from "./Router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router/>
            </ThemeProvider>
        </div>
    );
}

export default App;
