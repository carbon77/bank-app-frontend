import {Grid, InputAdornment, Stack, TextField} from "@mui/material";
import {ButtonPanel} from "../components/ButtonPanel";
import {Add, Payment, Search, SwapHoriz} from "@mui/icons-material";
import {OperationsPieChartPanel} from "../components/OperationsPieChartPanel";
import {CurrenciesPanel} from "../components/CurrenciesPanel";
import {WithdrawAccountModal} from "../components/WithdrawAccountModal";
import {TopUpAccountModal} from "../components/TopUpAccountModal";
import {TransferAccountModal} from "../components/TransferAccountModal";
import {useState} from "react";

export function HomePage() {
    const [withdrawOpen, setWithdrawOpen] = useState(false)
    const [topUpOpen, setTopUpOpen] = useState(false)
    const [transferOpen, setTransferOpen] = useState(false)

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
                        <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                            <ButtonPanel onClick={() => setTopUpOpen(true)} sx={{width: '120px'}}
                                         primaryText={"Пополнение"} icon={<Add/>}/>
                            <ButtonPanel onClick={() => setWithdrawOpen(true)} sx={{width: '120px'}}
                                         primaryText={"Снятие"} icon={<Payment/>}/>
                            <ButtonPanel onClick={() => setTransferOpen(true)} sx={{width: '120px'}}
                                         primaryText={"Перевод"} icon={<SwapHoriz/>}/>
                        </Stack>
                    </Grid>

                    <Grid item md={12}>
                        <OperationsPieChartPanel/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item md={4}>
                <CurrenciesPanel/>
            </Grid>

            <WithdrawAccountModal
                open={withdrawOpen}
                onClose={() => setWithdrawOpen(false)}
            />
            <TopUpAccountModal
                open={topUpOpen}
                onClose={() => setTopUpOpen(false)}
            />
            <TransferAccountModal
                open={transferOpen}
                onClose={() => setTransferOpen(false)}
            />
        </Grid>
    )
}