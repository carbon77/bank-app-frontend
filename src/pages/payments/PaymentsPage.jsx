import {Grid, Stack, Typography} from "@mui/material";
import {CarCrash, DirectionsBus, Games, House, PhoneAndroid, Wifi} from "@mui/icons-material";
import {ButtonPanel} from "../../components/ButtonPanel";
import {TopUpButtonPanel} from "../../components/TopUpButtonPanel";
import {WithdrawButtonPanel} from "../../components/WithdrawButtonPanel";
import {TransferPanel} from "../../components/TransferPanel";
import {RouterBreadcrumb} from "../../components/RouterBreadcrumb";
import {Link} from "react-router-dom";

export function PaymentsPage() {

    return (
        <Grid container spacing={2}>
            <Grid item md>
                <RouterBreadcrumb/>
            </Grid>
            <Grid item md={12}>
                <Typography variant={"h4"}>Платежи и переводы</Typography>
            </Grid>

            <Grid item md={12}>
                <TransferPanel/>
            </Grid>

            <Grid item md={12}>
                <Stack direction={"row"} spacing={2}>
                    <TopUpButtonPanel/>
                    <WithdrawButtonPanel/>
                </Stack>
            </Grid>

            <Grid item md={12}>
                <Stack direction={"row"} spacing={2}>
                    <ButtonPanel direction={"row"} icon={<CarCrash/>} primaryText={"Штрафы ГИБДД"}/>
                    <ButtonPanel direction={"row"} icon={<PhoneAndroid/>} primaryText={"Мобильная связь"}/>
                    <ButtonPanel direction={"row"} icon={<Wifi/>} primaryText={"Интернет"}/>
                </Stack>
            </Grid>

            <Grid item md={12}>
                <Stack direction={"row"} spacing={2}>
                    <ButtonPanel component={Link} to={"/payments/house"} direction={"row"}
                                 icon={<House/>}
                                 primaryText={"ЖКХ"}/>
                    <ButtonPanel direction={"row"} icon={<DirectionsBus/>} primaryText={"Транспортая карта"}/>
                    <ButtonPanel direction={"row"} icon={<Games/>} primaryText={"Игры"}/>
                </Stack>
            </Grid>
        </Grid>
    )
}