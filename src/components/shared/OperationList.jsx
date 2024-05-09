import {useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {List, ListItem, ListItemText} from "@mui/material";
import {OperationListItem} from "./OperationListItem";
import {convertDate} from "../../utils";
import {OperationModal} from "./OperationModal";

export function OperationList({
                                  operations,
                              }) {
    const accounts = useSelector(state => state.accounts.accounts)
    const [pickedOp, setPickedOp] = useState(null)
    const pickedOperation = operations.find(op => op.id === pickedOp)
    const pickedAccount = !pickedOperation ? null : accounts.find(acc => acc.id === pickedOperation.account)
    const items = useMemo(() => {
        let lastDate = null
        const result = []

        for (const op of operations) {
            if (lastDate === null || convertDate(lastDate) !== convertDate(op.createdAt)) {
                lastDate = op.createdAt
                result.push(
                    <ListItem sx={{p: 0}} key={`divider-item-${lastDate}`}>
                        <ListItemText>{convertDate(lastDate)}</ListItemText>
                    </ListItem>
                )
            }

            result.push(
                <OperationListItem
                    key={`item-${op.id}`}
                    operation={op}
                    account={accounts.find(account => account.id === op.account)}
                    onClick={() => setPickedOp(op.id)}
                />
            )
        }

        return result
    }, [operations])

    return (
        <List sx={{p: 0}}>
            {items}

            <OperationModal
                open={!!pickedOp}
                onClose={() => setPickedOp(null)}
                operation={pickedOperation}
                account={pickedAccount}
            />
        </List>
    )
}