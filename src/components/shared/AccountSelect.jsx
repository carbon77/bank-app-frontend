import {FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import {getAccountTitle, moneyInputFormatter} from "../../utils";
import {useSelector} from "react-redux";
import React from "react";

export function AccountSelect({value, onChange, ...other}) {
    const accounts = useSelector(state => state.accounts.accounts.filter(acc => !acc.closed))

    if (!accounts) {
        return <div>Loading...</div>
    }

    return (
        <FormControl size={"small"} required {...other}>
            <InputLabel>Выберите счёт</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={"Выберите счёт"}
            >
                {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                        <ListItemText sx={{margin: 0}} primary={moneyInputFormatter(account.balance.toString())}
                                      secondary={`${account.name} · ${getAccountTitle(account.accountType)}`}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}