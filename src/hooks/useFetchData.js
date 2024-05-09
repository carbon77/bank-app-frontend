import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const useFetchData = (
    selector,
    fetchThunk,
    fetchParams = {},
    deps=[],
    errorMessage = 'Ошибка в получении данных!') => {
    const data = useSelector(selector)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                await dispatch(fetchThunk(fetchParams))
            } catch (e) {
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [dispatch, ...deps])

    return {data, error, loading}
}