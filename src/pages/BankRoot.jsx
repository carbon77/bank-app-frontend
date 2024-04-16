import {Box, CssBaseline} from "@mui/material";
import {BankAppBar} from "../components/BankAppBar";
import {Outlet, useSearchParams} from "react-router-dom";
import {Alert} from "@mui/lab";
import {Check} from "@mui/icons-material";
import {useEffect, useState} from "react";

export function BankRoot() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        if (searchParams.has("success_message")) {
            setSuccessMessage(searchParams.get("success_message"))
            setTimeout(() => {
                setSuccessMessage("")
            }, 2000)
        }
    }, [searchParams])

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

            {!successMessage ? null : (
                <Alert icon={<Check fontSize="inherit"/>} severity={"success"} sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                }} onClose={() => {setSuccessMessage("")}}>{successMessage}</Alert>
            )}
        </div>
    )
}