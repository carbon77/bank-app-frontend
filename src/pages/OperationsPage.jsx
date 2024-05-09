import {Grid, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RouterBreadcrumb} from "../components/shared/RouterBreadcrumb";
import {ButtonPanel} from "../components/panels/ButtonPanel";
import {AddCard, ShoppingCart} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {OperationsPanel} from "../components/panels/OperationsPanel";

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
                <Stack direction={"row"} spacing={2}>
                    <ButtonPanel
                        component={Link}
                        to={"/operations/analytics?type=RECEIPT"}
                        direction={"row"}
                        primaryText={"Доходы"}
                        secondaryText={"Подробнее"}
                        icon={<AddCard/>}
                    />
                    <ButtonPanel
                        direction={"row"}
                        primaryText={"Расходы"}
                        secondaryText={"Подробнее"}
                        icon={<ShoppingCart/>}
                        component={Link}
                        to={"/operations/analytics?type=EXPENSE"}
                    />
                </Stack>
            </Grid>
            <Grid item md={12}>
                <OperationsPanel/>
            </Grid>
        </Grid>
    )
}