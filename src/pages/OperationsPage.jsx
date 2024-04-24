import {Box} from "@mui/material";
import {OperationsPanel} from "../components/OperationsPanel";
import {useSelector} from "react-redux";
import {OperationsPieChartPanel} from "../components/OperationsPieChartPanel";

export function OperationsPage() {
    const accounts = useSelector(state => state.accounts.accounts)

    if (!accounts) {
        return <div>Loading...</div>
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
        }}>
            <OperationsPieChartPanel />
            <OperationsPanel accounts={accounts}/>
        </Box>
    )
}