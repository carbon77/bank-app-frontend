import {ListItemText, MenuItem, Select} from "@mui/material";
import {getAccountTitle, moneyInputFormatter} from "../utils";
import {useSelector} from "react-redux";

export function AccountSelect({value, onChange, ...other}) {
    const accounts = useSelector(state => state.accounts.accounts)

    if (!accounts) {
        return <div>Loading...</div>
    }

    return (
        <Select
            {...other}
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
    )
}