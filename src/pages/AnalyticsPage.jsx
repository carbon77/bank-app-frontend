import {Button, ButtonGroup, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {RouterBreadcrumb} from "../components/shared/RouterBreadcrumb";
import {useMemo, useState} from "react";
import {BarChart, DonutLarge} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {AccountMultiSelect} from "../components/shared/AccountMultiSelect";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {OperationsPanel} from "../components/panels/OperationsPanel";
import {OperationsPieChartPanel} from "../components/panels/OperationsPieChartPanel";
import {OperationsBarChartPanel} from "../components/panels/OperationsBarChartPanel";

export function AnalyticsPage() {
    const [searchParams, setSearchParams] = useSearchParams({
        type: 'EXPENSE',
        accountIds: '',
    })
    const theme = useTheme()
    const accounts = useSelector(state => state.accounts.accounts)
    const accountIds = useMemo(
        () => searchParams.get("accountIds").split(",").filter(id => id).map(id => +id),
        [searchParams]
    )
    const selectedAccounts = useMemo(
        () => accounts.filter(acc => accountIds.includes(acc.id)),
        [accountIds]
    )
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(dayjs(Date.now()))
    const [shownBar, setShownBar] = useState('PIE')
    const selectedType = useMemo(() => searchParams.get('type'), [searchParams])
    const match = useMediaQuery(theme.breakpoints.up('md'))

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

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <RouterBreadcrumb/>
            </Grid>
            <Grid item md={6} xs={12}>
                <Typography variant={"h4"}>Анализ финансов</Typography>
            </Grid>
            <Grid item md={6} xs={12} sx={{
                display: 'flex',
                justifyContent: {
                    md: 'end',
                    xs: 'start',
                },
            }}>
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
            <Grid item xs={12}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
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
            <Grid item xs={12}>
                {shownBar === 'PIE' ? (
                    <OperationsPieChartPanel
                        direction={match ? "column" : "row"}
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

            <Grid item xs={12}>
                <OperationsPanel
                    accountIds={accountIds}
                    operationType={selectedType}
                    startDate={startDate}
                    endDate={endDate}
                    type={selectedType}
                />
            </Grid>
        </Grid>
    )
}