import {Grid, Typography} from "@mui/material";
import {OperationsPanel} from "../components/OperationsPanel";
import {useSelector} from "react-redux";
import {OperationsPieChartPanel} from "../components/OperationsPieChartPanel";
import {RouterBreadcrumb} from "../components/RouterBreadcrumb";
import {OperationsBarChartPanel} from "../components/OperationsBarChartPanel";

export function OperationsPage() {
    const accounts = useSelector(state => state.accounts.accounts)

    if (!accounts) {
        return <div>Loading...</div>
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <RouterBreadcrumb/>
            </Grid>
            <Grid item md={12}>
                <Typography variant={"h4"}>Операции</Typography>
            </Grid>
            <Grid item md={12}>
                <OperationsPieChartPanel/>
            </Grid>
            <Grid item md={12}>
                <OperationsBarChartPanel/>
            </Grid>
            <Grid item md={12}>
                <OperationsPanel accounts={accounts}/>
            </Grid>
        </Grid>
    )
}