import {Grid, Stack, Typography} from "@mui/material";
import {RouterBreadcrumb} from "../../components/RouterBreadcrumb";
import {ButtonPanel} from "../../components/ButtonPanel";
import {ElectricBolt, WaterDrop, Whatshot} from "@mui/icons-material";
import {Link} from "react-router-dom";

export function HousePaymentsPage() {
    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <RouterBreadcrumb/>
            </Grid>
            <Grid item md={12}>
                <Typography variant={"h4"}>ЖКХ</Typography>
            </Grid>

            <Grid item md={12}>
                <Stack direction={"row"} spacing={2}>
                    <ButtonPanel direction={"row"} icon={<ElectricBolt/>} primaryText={"Электроэнергия"}/>
                    <ButtonPanel component={Link} to={"/payments/pay/Газ"} direction={"row"} icon={<Whatshot/>}
                                 primaryText={"Газ"}/>
                    <ButtonPanel direction={"row"} icon={<WaterDrop/>} primaryText={"Вода"}/>
                </Stack>
            </Grid>
        </Grid>
    )
}