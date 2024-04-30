import {Grid, Typography} from "@mui/material";
import {RouterBreadcrumb} from "../../components/RouterBreadcrumb";

export function HousePaymentsPage() {
    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <RouterBreadcrumb />
            </Grid>
            <Grid item md={12}>
                <Typography variant={"h5"}>ЖКХ</Typography>
            </Grid>
        </Grid>
    )
}