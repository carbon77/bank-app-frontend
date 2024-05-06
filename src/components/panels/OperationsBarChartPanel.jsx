import {Panel} from "./Panel";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {getOperationsStatsByMonthsThunk} from "../../store/operationSlice";
import {Stack, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts";

export function OperationsBarChartPanel({
                                            accountIds = null,
                                            startDate = null,
                                            endDate = null,
}) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const operationStats = useSelector(state => state.operations.operationStats)
    const operationStatsData = useMemo(() => {
        if (!operationStats) {
            return
        }
        const operationData = {}

        operationStats.map(month => ({
            ...month,
            month: new Date(month.month).toLocaleString('ru', {
                month: 'long',
                year: 'numeric'
            }),
        })).map(({month, type, total}) => {
            if (!operationData.hasOwnProperty(month)) {
                operationData[month] = [0, 0]
            }

            if (type === 'EXPENSE') {
                operationData[month][0] = total
            } else if (type === 'RECEIPT') {
                operationData[month][1] = total
            }
        })
        return Object.entries(operationData).map(entry => ({
            month: entry[0],
            expense: entry[1][0],
            receipt: entry[1][1],
        }))
    }, [operationStats])

    async function handleFetchState() {
        setIsLoading(true)
        await dispatch(getOperationsStatsByMonthsThunk({
            accountIds,
            startDate,
            endDate,
        }))
        setIsLoading(false)
    }

    useEffect(() => {
        handleFetchState()
    }, [accountIds])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Panel>
            <Stack>
                <Typography variant={"h5"}>Расходы и доходы по месяцам</Typography>
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'month'
                        }
                    ]}
                    dataset={operationStatsData}
                    series={[
                        {
                            dataKey: 'expense',
                            label: 'Расходы',
                        },
                        {
                            dataKey: 'receipt',
                            label: 'Доходы',
                        }
                    ]}
                    height={300}
                />
            </Stack>
        </Panel>
    )
}