import {Avatar, Box, Button, ButtonGroup, Chip, Grid, Stack, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Panel} from "./Panel";
import {getOperationCategoriesThunk} from "../../store/operationSlice";
import {PieChart} from "@mui/x-charts";


export function OperationsPieChartPanel({
                                            accountIds = null,
                                            operationType = null,
                                            direction = 'row',
                                            startDate = null,
                                            endDate = null,
                                        }) {
    const colors = [
        '#fc8a9c',
        '#1E90FF',
        '#32CD32',
        '#FF69B4',
        '#00BFFF',
        '#FF6347',
        '#FFD700',
        '#FF8C00',
        '#20B2AA',
        '#BA55D3',
        '#9ACD32'
    ]
    const categoryGroups = useSelector(state => state.operations.categoryGroups)
    const [disabledCategories, setDisabledCategories] = useState([])
    const [selectedType, setSelectedType] = useState('EXPENSE')
    const [isLoading, setIsLoading] = useState(true)
    const trueType = useMemo(() => operationType || selectedType, [selectedType, operationType])
    const categoryData = useMemo(() => categoryGroups?.filter(({type}) => type === trueType).map((group, index) => ({
        id: group.category.id,
        label: group.category.name,
        value: group.totalAmount,
        color: colors[index % colors.length],
    })), [categoryGroups, trueType])
    const dispatch = useDispatch()

    const onChipClickHandle = catId => () => {
        if (disabledCategories.includes(catId)) {
            setDisabledCategories(disabledCategories.filter(c => c !== catId))
        } else {
            setDisabledCategories([...disabledCategories, catId])
        }
    }

    async function handleFetchGroups() {
        try {
            setIsLoading(true)
            await dispatch(getOperationCategoriesThunk({
                accountIds,
                startDate,
                endDate,
            }))
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleFetchGroups()
    }, [accountIds])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Panel>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h5"}>Категории</Typography>
                </Grid>
                <Grid item md={direction === 'row' ? 7 : 12} xs={12}>
                    <Stack spacing={1}>
                        {!operationType ? (
                            <Box>
                                <ButtonGroup size={"small"}>
                                    <Button sx={{
                                        textTransform: 'none',
                                    }} variant={selectedType === 'EXPENSE' ? 'contained' : 'outlined'}
                                            onClick={() => setSelectedType('EXPENSE')}>Расходы</Button>,
                                    <Button sx={{
                                        textTransform: 'none',
                                    }} variant={selectedType === 'RECEIPT' ? 'contained' : 'outlined'}
                                            onClick={() => setSelectedType('RECEIPT')}>Доходы</Button>,
                                </ButtonGroup>
                            </Box>
                        ) : null}
                        <Stack direction="row" gap={1} rowGap={1} flexWrap={'wrap'}>
                            {categoryData.map((cat, index) => (
                                <Chip
                                    key={index}
                                    label={cat.label}
                                    size={"small"}
                                    avatar={
                                        <Avatar sx={{bgcolor: cat.color}}> </Avatar>
                                    }
                                    variant={"outlined"}
                                    onClick={onChipClickHandle(cat.id)}
                                    sx={{
                                        textDecoration: disabledCategories.includes(cat.id) ? "line-through" : "none",
                                        borderColor: disabledCategories.includes(cat.id) ? 'none' : cat.color,
                                    }}
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item md xs={12}>
                    <PieChart
                        sx={{
                            // border: '1px solid black'
                        }}
                        series={[
                            {
                                data: categoryData.filter(cat => !disabledCategories.includes(cat.id)),
                                innerRadius: direction === 'row' ? 50 : 70,
                                paddingAngle: 2,
                                cornerRadius: 5,
                                cx: direction === 'row' ? 100 : 400,
                                highlightScope: {faded: 'global', highlighted: 'item'},
                                faded: {
                                    innerRadius: direction === 'row' ? 30 : 60,
                                    additionalRadius: -30,
                                    color: 'gray'
                                },
                            },
                        ]}
                        slotProps={{
                            legend: {
                                hidden: true,
                            }
                        }}
                        height={direction === 'row' ? 200 : 350}
                    >
                    </PieChart>
                </Grid>
            </Grid>
        </Panel>
    )
}