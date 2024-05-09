import {Box, CssBaseline} from "@mui/material";
import {BankAppBar} from "../../components/shared/BankAppBar";
import {Outlet} from "react-router-dom";
import {Footer} from "../../components/shared/Footer";

export function BankRoot() {
    return (
        <div>
            <CssBaseline/>
            <BankAppBar/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 15,
                    mb: 5,
                }}
            >
                <Outlet/>
            </Box>
            <Footer />
        </div>
    )
}