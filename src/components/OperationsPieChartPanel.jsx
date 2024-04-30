import {Box, Button, ButtonGroup, Chip, Paper, Stack, Typography} from "@mui/material";
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
    const [disabledCategories, setDisabledCategories] = useState([])
    const [selectedType, setSelectedType] = useState('EXPENSE')

    const onChipClickHandle = catId => () => {
        if (disabledCategories.includes(catId)) {
            setDisabledCategories(disabledCategories.filter(c => c !== catId))
        } else {
            setDisabledCategories([...disabledCategories, catId])
        }
    }

    useEffect(() => {
        if (!operations) {
            return
        }
        const categories = {}

        operations?.forEach((op, index) => {
            if (op.type !== selectedType || op.status === 'FAILED') {
                return
            }

            if (!categories[op.category.name]) {
                categories[op.category.name] = {
                    id: op.category.id,
                    name: op.category.name,
                    value: 0,
                }
            }
            categories[op.category.name].value += op.amount
        })
        setOperationCategories(Object.values(categories))
    }, [operations, selectedType])

    useEffect(() => {
        dispatch(getOperationsThunk({accountId}))
    }, [])

    if (!operationCategories) {
        return <div>Loading...</div>
    }

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '1em 2em',
        }}>
            <Stack spacing={1}>
                <Typography variant={'h6'}>Операции</Typography>
                <Box>
                    <ButtonGroup size={"small"}>
                        <Button sx={{
                            textTransform: 'none',
                        }} variant={selectedType === 'EXPENSE' ? 'contained' : 'outlined'}
                                onClick={() => setSelectedType('EXPENSE')}>Расходы</Button>,
                        <Button sx={{
                            textTransform: 'none',
                        }} variant={selectedType === 'RECEIPT' ? 'contained' : 'outlined'}
                                onClick={() => setSelectedType('RECEIPT')}>Поступления</Button>,
                    </ButtonGroup>
                </Box>
                <Stack width={'200px'} direction="row" gap={1} rowGap={1} flexWrap={'wrap'}>
                    {operationCategories.map((cat, index) => (
                        <Chip
                            key={index}
                            label={cat.name}
                            variant={disabledCategories.includes(cat.id) ? "contained" : "outlined"}
                            onClick={onChipClickHandle(cat.id)}
                            sx={{
                                color: COLORS[index % COLORS.length],
                                borderColor: COLORS[index % COLORS.length],
                            }}/>
                    ))}
                </Stack>
            </Stack>
            <PieChart width={200} height={200}>
                <Pie data={operationCategories.filter(cat => !disabledCategories.includes(cat.id))}
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