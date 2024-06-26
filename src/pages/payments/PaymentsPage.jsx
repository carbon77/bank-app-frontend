import {Grid, Stack, Typography} from "@mui/material";
import {CarCrash, DirectionsBus, House, PhoneAndroid, Receipt, Wifi} from "@mui/icons-material";
import {ButtonPanel} from "../../components/panels/ButtonPanel";
import {TopUpButtonPanel} from "../../components/panels/TopUpButtonPanel";
import {WithdrawButtonPanel} from "../../components/panels/WithdrawButtonPanel";
import {TransferPanel} from "../../components/panels/TransferPanel";
import {RouterBreadcrumb} from "../../components/shared/RouterBreadcrumb";
import {Link} from "react-router-dom";

export function PaymentsPage() {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <RouterBreadcrumb/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h4"}>Платежи и переводы</Typography>
            </Grid>

            <Grid item xs={12}>
                <TransferPanel/>
            </Grid>

            <Grid item xs={12}>
                <Stack direction={"row"} spacing={2}>
                    <TopUpButtonPanel/>
                    <WithdrawButtonPanel/>
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Stack direction={{
                    md: 'row',
                    xs: 'column',
                }} spacing={2}>
                    <ButtonPanel component={Link} to={"/payments/pay/Штрафы ГИБДД"} direction={"row"} icon={<CarCrash/>}
                                 primaryText={"Штрафы ГИБДД"}/>
                    <ButtonPanel component={Link} to={"/payments/pay/Мобильная связь"} direction={"row"}
                                 icon={<PhoneAndroid/>} primaryText={"Мобильная связь"}/>
                    <ButtonPanel component={Link} to={"/payments/pay/Интернет"} direction={"row"} icon={<Wifi/>}
                                 primaryText={"Интернет"}/>
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Stack direction={{
                    md: 'row',
                    xs: 'column',
                }} spacing={2}>
                    <ButtonPanel component={Link} to={"/payments/house"} direction={"row"}
                                 icon={<House/>}
                                 primaryText={"ЖКХ"}/>
                    <ButtonPanel component={Link} to={"/payments/pay/Транспортная карта"} direction={"row"}
                                 icon={<DirectionsBus/>} primaryText={"Транспортая карта"}/>
                    <ButtonPanel component={Link} to={"/payments/pay/По реквизитам"} direction={"row"} icon={<Receipt/>}
                                 primaryText={"По реквизитам"}/>
                </Stack>
            </Grid>
        </Grid>
    )
}