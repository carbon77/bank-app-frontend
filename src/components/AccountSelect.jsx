import {ListItemText, MenuItem, Select} from "@mui/material";
import {getAccountTitle} from "../utils";

export function AccountSelect({accounts, value, onChange, ...other}) {
    return (
        <Select
            {...other}
            value={value}
            onChange={onChange}
            label={"Выберите счёт"}
        >
            {accounts.map(account => (
                <MenuItem key={account.id} value={account.id}>
                    <ListItemText sx={{margin: 0}} primary={account.name}
                                  secondary={getAccountTitle(account.accountType)}/>
                </MenuItem>
            ))}
        </Select>
    )
}