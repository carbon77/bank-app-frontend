import {Box, Chip, Paper, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOperationsThunk} from "../store/operationSlice";
import {Cell, Pie, PieChart} from "recharts";
import {renderActiveShape} from "../utils";

export function OperationsPieChartPanel({accountId = null}) {
    const operations = useSelector(state => state.operations.operations)
    const dispatch = useDispatch()
    const [activeIndex, setActiveIndex] = useState(0)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    const [operationCategories, setOperationCategories] = useState([])
    const [activeCategories, setActiveCategories] = useState([])

    const onChipClickHandle = index => () => {
        if (activeCategories.includes(index)) {
            setActiveCategories(activeCategories.filter(c => c !== index))
        } else {
            setActiveCategories([...activeCategories, index])
        }
    }

    useEffect(() => {
        if (!operations) {
            return
        }
        const categories = {}

        operations?.forEach((op, index) => {
            if (!categories[op.category.name]) {
                categories[op.category.name] = {
                    name: op.category.name,
                    value: 0,
                }
            }
            categories[op.category.name].value += op.amount
        })
        setOperationCategories(Object.values(categories))
    }, [operations])

    useEffect(() => {
        dispatch(getOperationsThunk({accountId}))
    }, [])

    if (!operationCategories) {
        return <div>Loading...</div>
    }

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
            justifyContent: 'space-around',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '1em 0',
                gap: '10px',
            }}>
                <Typography variant={'h5'}>Категории</Typography>
                <Stack width={'200px'} direction="row" gap={1} rowGap={1} flexWrap={'wrap'}>
                    {operationCategories.map((cat, index) => (
                        <Chip
                            key={index}
                            label={cat.name}
                            variant={activeCategories.includes(index) ? "contained" : "outlined"}
                            onClick={onChipClickHandle(index)}
                            sx={{
                                color: COLORS[index % COLORS.length],
                                borderColor: COLORS[index % COLORS.length],
                            }}/>
                    ))}
                </Stack>
            </Box>
            <PieChart width={200} height={200}>
                <Pie data={operationCategories.filter((_, index) => !activeCategories.includes(index))}
                     activeIndex={activeIndex}
                     activeShape={renderActiveShape}
                     dataKey="value"
                     innerRadius={60}
                     outerRadius={80}
                     onMouseEnter={(_, index) => setActiveIndex(index)}
                     isAnimationActive={false}
                >
                    {operationCategories.map((cat, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
            </PieChart>
        </Paper>
    )
}