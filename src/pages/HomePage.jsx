import {Grid, InputAdornment, Stack, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import {OperationsPieChartPanel} from "../components/OperationsPieChartPanel";
import {CurrenciesPanel} from "../components/CurrenciesPanel";
import {TransferPanel} from "../components/TransferPanel";
import {TopUpButtonPanel} from "../components/TopUpButtonPanel";
import {WithdrawButtonPanel} from "../components/WithdrawButtonPanel";

export function HomePage() {
    return (
        <Grid container spacing={2}>
            <Grid item md={8}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            variant={"filled"}
                            label={"Поиск"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position={"start"}><Search/></InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item md={12}>
                        <Stack direction={"row"} spacing={2}>
                            <TopUpButtonPanel sx={{width: '100%'}}/>
                            <WithdrawButtonPanel sx={{width: '100%'}}/>
                        </Stack>
                    </Grid>

                    <Grid item md={12}>
                        <TransferPanel/>
                    </Grid>

                    <Grid item md={12}>
                        <OperationsPieChartPanel/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item md={4}>
                <CurrenciesPanel/>
            </Grid>
        </Grid>
    )
}