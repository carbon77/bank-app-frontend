import {useSnackbar} from "notistack";
import {IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import React from "react";

export function useShowSnackbar() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    return function showSnackbar(text, variant = 'success') {
        const key = enqueueSnackbar(text, {
            variant: variant,
            action: () => <IconButton sx={{color: 'white'}} onClick={() => closeSnackbar(key)}><Close/></IconButton>
        })
    }
}