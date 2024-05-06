import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {moneyInputFormatter} from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrenciesThunk} from "../../store/authSlice";
import {Panel} from "./Panel";

const TabPanel = ({
                      children, value, index
                  }) => (
    <Box
        hidden={value !== index}
    >
        {children}
    </Box>
)


export function CurrenciesPanel() {
    const [selectedTab, setSelectedTab] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const currencies = useSelector(state => state.auth.currencies)
    const dispatch = useDispatch()
    const currencyNames = {
        'USD': 'Доллар США',
        'EUR': 'Евро',
        'CNY': 'Китайский юань',
        'GBP': 'Фунт стерлингов',
    }

    async function fetchCurrencies() {
        setIsLoading(true)
        await dispatch(fetchCurrenciesThunk())
        setIsLoading(false)
    }

    useEffect(() => {
        if (!currencies) {
            fetchCurrencies()
        }
    }, [currencies])

    return (
        <Panel sx={{p: 0}}>
            <Typography variant={"h6"} sx={{padding: '.5em 1em'}}>Курсы валют</Typography>

            {isLoading ? <div>Loading...</div> : (
                <>
                    {/*<Tabs centered value={selectedTab} onChange={(e, newTab) => setSelectedTab(newTab)}>*/}
                    {/*    <Tab label={"Валюты"}/>*/}
                    {/*    <Tab label={"Металлы"}/>*/}
                    {/*</Tabs>*/}

                    <TabPanel value={selectedTab} index={0}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Валюта</TableCell>
                                        <TableCell>Курс</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currencies
                                        ?.filter(c => currencyNames.hasOwnProperty(c[0]))
                                        ?.map(([currency, value]) => (
                                            <TableRow key={currency}>
                                                <TableCell>{currencyNames[currency]}, {currency}</TableCell>
                                                <TableCell>{moneyInputFormatter(value.toString(), {
                                                    decimalScale: 2,
                                                    decimalSeparator: ',',
                                                })}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1}>
                        Металлы
                    </TabPanel>
                </>
            )}
        </Panel>
    )
}