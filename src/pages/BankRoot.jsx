import {Box, CssBaseline} from "@mui/material";
import {BankAppBar} from "../components/BankAppBar";
import {Outlet} from "react-router-dom";

export function BankRoot() {
    return (
        <div>
            <CssBaseline/>
            <BankAppBar/>
            <Box
                sx={{
                    mt: 15
                }}
            >
                <Outlet/>
            </Box>
        </div>
    )
}