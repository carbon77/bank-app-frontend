import {Panel} from "./Panel";
import {Stack, TextField, Typography} from "@mui/material";
import {AccountSelect} from "./AccountSelect";
import {MoneyInputFormat} from "../utils";
import React from "react";

export function PaymentAmountForm({amount, setAmount, selectedAccount, setSelectedAccount}) {
    return (
        <Panel>
            <Stack spacing={2}>

                <Typography variant={"h5"} mb={2}>Введите сумму платежа</Typography>
                <AccountSelect value={selectedAccount}
                               onChange={(e) => setSelectedAccount(e.target.value)}/>
                <TextField
                    label={"Сумма"}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    InputProps={{
                        inputComponent: MoneyInputFormat,
                    }}
                />
            </Stack>
        </Panel>
    )
}