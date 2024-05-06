import {Grid, Stack} from "@mui/material";
import {OperationsPieChartPanel} from "../components/panels/OperationsPieChartPanel";
import {TransferPanel} from "../components/panels/TransferPanel";
import {TopUpButtonPanel} from "../components/panels/TopUpButtonPanel";
import {WithdrawButtonPanel} from "../components/panels/WithdrawButtonPanel";
import {CurrenciesPanel} from "../components/panels/CurrenciesPanel";

export function HomePage() {
    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <OperationsPieChartPanel link={"/operations/analytics"}/>
            </Grid>
            <Grid item md={8}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Stack direction={"row"} spacing={2}>
                            <TopUpButtonPanel/>
                            <WithdrawButtonPanel/>
                        </Stack>
                    </Grid>

                    <Grid item md={12}>
                        <TransferPanel/>
                    </Grid>

                </Grid>
            </Grid>

            <Grid item md={4}>
                <CurrenciesPanel/>
            </Grid>
        </Grid>
    )
}