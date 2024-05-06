import {useSelector} from "react-redux";
import {Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import {getAccountAvatarIcon, getAccountTitle, moneyInputFormatter} from "../utils";
import React from "react";

export function AccountMultiSelect({
                                       selectedAccounts, setSelectedAccounts, onChange, ...other
                                   }) {
    const accounts = useSelector(state => state.accounts.accounts)

    if (!accounts) {
        return <div>Loading...</div>
    }

    return (
        <FormControl {...other}>
            <InputLabel>Выберите счета</InputLabel>
            <Select
                value={selectedAccounts}
                onChange={onChange}
                multiple
                label={"Выберите счета"}
                renderValue={selected => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip
                                key={value.id}
                                icon={getAccountAvatarIcon(value.accountType, {
                                    color: 'red'
                                })}
                                label={`${value.name} · ${getAccountTitle(value.accountType)}`}
                            />
                        ))}
                    </Box>
                )}
            >
                {accounts.map(account => (
                    <MenuItem key={account.id} value={account}>
                        <Checkbox checked={selectedAccounts.includes(account)}/>
                        <ListItemText sx={{margin: 0}} primary={moneyInputFormatter(account.balance.toString())}
                                      secondary={`${account.name} · ${getAccountTitle(account.accountType)}`}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}