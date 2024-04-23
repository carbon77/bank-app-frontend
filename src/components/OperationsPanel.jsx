import {List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {getOperationsThunk} from "../store/operationSlice";
import {convertDate} from "../utils";
import {OperationModal} from "./OperationModal";
import {OperationListItem} from "./OperationListItem";

export const OperationsPanel = ({
                                    accounts,
                                    accountId = null,
                                }) => {
    const operations = useSelector(state => {
        if (state.operations.operations === null) {
            return null
        }
        return [...state.operations.operations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    })
    const dispatch = useDispatch()
    const [pickedOp, setPickedOp] = useState(null)
    const isPicked = useMemo(() => pickedOp !== null, [pickedOp])
    const pickedAccount = useMemo(() => isPicked ? getAccount(pickedOp) : null, [isPicked, pickedOp])

    function getAccount(op) {
        return accounts?.find(account => account.id === op.account)
    }

    const isNewGroup = (op, idx, arr) => idx === 0 || convertDate(arr[idx - 1].createdAt) !== convertDate(op.createdAt)
    const getOperationElement = (op, idx, arr) => {
        return (
            <>
                {isNewGroup(op, idx, arr) ? (
                    <ListItem>
                        <ListItemText>{convertDate(op.createdAt)}</ListItemText>
                    </ListItem>
                ) : null}
                <OperationListItem onClick={() => setPickedOp(op)}
                                   account={getAccount(op)}
                                   operation={op}
                />
            </>
        )
    }

    useEffect(() => {
        dispatch(getOperationsThunk({accountId}))
    }, [])

    return (
        <>
            <Paper elevation={2}>
                <Typography variant={"h5"} paddingX={".5em"} paddingTop={".5em"}>Операции</Typography>

                {(!operations || !accounts) ? <div>Loading...</div> :
                    <List>{operations.map(getOperationElement)}</List>}
            </Paper>
            <OperationModal
                account={pickedAccount}
                operation={pickedOp}
                onClose={() => setPickedOp(null)}
                open={isPicked}
            />
        </>
    )
}