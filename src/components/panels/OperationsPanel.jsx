import {Panel} from "./Panel";
import {Alert, CircularProgress, Pagination, Stack, Typography} from "@mui/material";
import {getOperationsThunk} from "../../store/operationSlice";
import {useFetchData} from "../../hooks/useFetchData";
import {OperationList} from "../shared/OperationList";
import {useState} from "react";

export function OperationsPanel({
                                    accountIds = null,
                                    operationType = null,
                                    startDate = null,
                                    endDate = null,
                                    type = null,
                                }) {
    const [page, setPage] = useState(0)
    const {data: operations, error, loading} = useFetchData({
        selector: state => state.operations.operations,
        fetchThunk: getOperationsThunk,
        fetchParams: {
            accountIds,
            page,
            operationType,
            startDate,
            endDate,
            type,
        },
        deps: [page, accountIds, operationType, startDate, endDate, type],
    })

    return (
        <Panel>
            <Stack spacing={2}>
                <Typography variant={"h5"}>Операции</Typography>

                {loading ? <CircularProgress/> : <>
                    {error ? <Alert severity={"error"}>{error}</Alert> : <>
                        <OperationList operations={operations.content}/>

                        <Pagination
                            count={operations.totalPages}
                            showFirstButton
                            showLastButton
                            variant={"outlined"}
                            color={"primary"}
                            page={page + 1}
                            onChange={(event, value) => setPage(value - 1)}
                        />
                    </>}
                </>}
            </Stack>
        </Panel>
    )
}