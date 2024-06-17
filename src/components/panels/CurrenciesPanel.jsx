import {
    Alert,
    Box,
    CircularProgress,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {fetchCurrenciesThunk} from "../../store/authSlice.ts";
import {Panel} from "./Panel";
import {Cached} from "@mui/icons-material";
import {useFetchData} from "../../hooks/useFetchData";
import {moneyInputFormatter} from "../../utils";
import {useEffect} from "react";

function CurrenciesTable({currencies, currencyNames}) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Валюта</TableCell>
                        <TableCell>Курс</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(currencies)
                        ?.filter(([currency, rate]) => currencyNames.hasOwnProperty(currency))
                        ?.map(([currency, rate]) => (
                            <TableRow key={currency}>
                                <TableCell>{currencyNames[currency]}, {currency}</TableCell>
                                <TableCell>{moneyInputFormatter((1 / rate).toString(), {
                                    decimalScale: 2,
                                    decimalSeparator: ',',
                                })}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function CurrenciesPanel() {
    const {
        data: currencies,
        error,
        loading,
        fetchData,
    } = useFetchData({
        selector: state => state.auth.currencies,
        fetchThunk: fetchCurrenciesThunk,
        cache: true,
    })
    const currencyNames = {
        'USD': 'Доллар США',
        'EUR': 'Евро',
        'CNY': 'Китайский юань',
        'GBP': 'Фунт стерлингов',
    }

    useEffect(() => {
        console.log(currencies)
    }, [currencies]);

    return (
        <Panel sx={{
            p: 0
        }}>
            <Stack
                sx={{
                    p: '.5em 1em'
                }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Typography variant={"h6"}>Курсы валют</Typography>
                <IconButton color={"primary"} disabled={loading} onClick={() => fetchData()}>
                    <Cached/>
                </IconButton>
            </Stack>

            {loading || !currencies ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <CircularProgress sx={{p: 'auto', m: '1em'}}/>
                </Box>
            ) : (
                <>
                    {error ? <Alert severity={"error"}>{error}</Alert> : (
                        <CurrenciesTable currencies={currencies} currencyNames={currencyNames}/>
                    )}
                </>
            )}
        </Panel>
    )
}