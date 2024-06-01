import {Alert, CircularProgress, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import operationService from "../../api/operationService";

export const TotalAmountTitle = ({
                                     accountIds,
                                     startDate,
                                     endDate,
                                     type,
                                 }) => {

    const [operations, setOperations] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const totalAmount = useMemo(() => operations?.reduce((acc, op) => acc + op.amount, 0), [operations])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const newOperations = await operationService.getOperations({
                    accountIds, endDate, startDate, type, size: Number.MAX_VALUE
                }).then(data => data.content)
                setOperations(newOperations.filter(op => op.status !== 'FAILED'))
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [accountIds, startDate, endDate, type])

    useEffect(() => {
        console.log(operations)
    }, [operations])

    if (loading) {
        return <CircularProgress/>
    }

    if (error) {
        return <Alert severity={"error"} variant={"outlined"}>{error}</Alert>
    }

    return (
        <Typography variant={"h6"}>{type === 'EXPENSE' ? 'Расходы' : 'Доходы'}: {totalAmount} ₽</Typography>
    )
}