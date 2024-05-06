import {Button, ButtonGroup, Grid, Stack, Typography} from "@mui/material";
import {RouterBreadcrumb} from "../components/RouterBreadcrumb";
import {useEffect, useMemo, useState} from "react";
import {BarChart, DonutLarge} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {getOperationsThunk} from "../store/operationSlice";
import {OperationsPieChartPanel} from "../components/OperationsPieChartPanel";
import {OperationsBarChartPanel} from "../components/OperationsBarChartPanel";
import {moneyInputFormatter} from "../utils";
import {useSearchParams} from "react-router-dom";
import {AccountMultiSelect} from "../components/AccountMultiSelect";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

export function AnalyticsPage() {
    const [searchParams, setSearchParams] = useSearchParams({
        type: 'EXPENSE',
        accountIds: '',
    })
    const [shownBar, setShownBar] = useState('PIE')
    const selectedType = useMemo(() => searchParams.get('type'), [searchParams])
    const operations = useSelector(state => state.operations.operations)
    const accounts = useSelector(state => state.accounts.accounts)
    const selectedAccounts = useMemo(() => {
            if (!accounts) {
                return []
            }
            const accountIds = searchParams.get("accountIds").split(',')
            return accounts.filter(acc => accountIds.includes(acc.id.toString()))
        }, [accounts, searchParams]
    )
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(dayjs(Date.now()))
    const totalAmount = useMemo(() => {
        let result = 0

        if (!operations) {
            return result
        }

        operations.forEach(op => {
            if (op.type === selectedType &&
                (selectedAccounts.length === 0 || selectedAccounts.map(acc => acc.id).includes(op.account)) &&
                dayjs(op.createdAt) >= startDate &&
                dayjs(op.createdAt) <= endDate
            ) {
                result += op.amount
            }
        })
        return result
    }, [operations, selectedType, selectedAccounts, startDate, endDate])

    async function fetchOperations() {
        await dispatch(getOperationsThunk({
            accountId: null,
        }))
    }

    function setSelectedType(newType) {
        setSearchParams(prev => ({
                accountIds: prev.get("accountIds"),
                type: newType,
            }
        ))
    }

    function setSelectedAccounts(accounts) {
        setSearchParams(prev => ({
            type: prev.get('type'),
            accountIds: accounts.map(acc => acc.id).join(','),
        }))
    }

    useEffect(() => {

    }, [searchParams])

    useEffect(() => {
        if (!operations) {
            fetchOperations()
        }
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <RouterBreadcrumb/>
            </Grid>
            <Grid item md={12}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"h4"}>Анализ финансов</Typography>
                    <ButtonGroup>
                        <Button sx={{
                            textTransform: 'none',
                        }} variant={selectedType === 'EXPENSE' ? 'contained' : 'outlined'}
                                onClick={() => setSelectedType('EXPENSE')}>Расходы</Button>,
                        <Button sx={{
                            textTransform: 'none',
                        }} variant={selectedType === 'RECEIPT' ? 'contained' : 'outlined'}
                                onClick={() => setSelectedType('RECEIPT')}>Доходы</Button>,
                    </ButtonGroup>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2} sx={{
                    width: {
                        md: '50%',
                        xs: '100%',
                    }
                }}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <DatePicker
                            maxDate={endDate}
                            label={"Начало"}
                            value={startDate}
                            onChange={value => setStartDate(value)}
                        />
                        <Typography>-</Typography>
                        <DatePicker
                            minDate={startDate}
                            maxDate={dayjs(Date.now())}
                            label={"Конец"}
                            value={endDate}
                            onChange={value => setEndDate(value)}
                        />
                    </Stack>

                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <AccountMultiSelect
                            sx={{
                                width: '100%',
                            }}
                            selectedAccounts={selectedAccounts}
                            setSelectedAccounts={setSelectedAccounts}
                            onChange={e => {
                                const {
                                    target: {value}
                                } = e
                                setSelectedAccounts(value)
                            }}
                        />
                    </Stack>
                </Stack>
            </Grid>
            <Grid item md={12}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1}>
                        <Typography variant={"h5"}>
                            {selectedType === 'RECEIPT' ? 'Доходы' : 'Расходы'}:
                        </Typography>
                        <Typography variant={"h5"}>
                            {moneyInputFormatter(totalAmount.toString())}
                        </Typography>
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                        <Button
                            color={shownBar === 'PIE' ? 'primary' : 'inherit'}
                            variant={"contained"}
                            onClick={() => setShownBar('PIE')}
                        >
                            <DonutLarge/>
                        </Button>
                        <Button
                            color={shownBar === 'BAR' ? 'primary' : 'inherit'}
                            variant={"contained"}
                            onClick={() => setShownBar('BAR')}
                        >
                            <BarChart/>
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item md={12}>
                {shownBar === 'PIE' ? (
                    <OperationsPieChartPanel
                        direction={"column"}
                        accountIds={selectedAccounts.map(account => account.id)}
                        operationType={selectedType}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ) : (
                    <OperationsBarChartPanel
                        accountIds={selectedAccounts.map(account => account.id)}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
            </Grid>
        </Grid>
    )
}