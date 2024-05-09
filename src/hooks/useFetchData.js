import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const useFetchData = ({
                                 selector,
                                 fetchThunk,
                                 fetchParams = {},
                                 deps = [],
                                 errorMessage = 'Ошибка в получении данных!',
                                 cache = false,
                             }) => {
    const data = useSelector(selector)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(!cache)
    const dispatch = useDispatch()
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

    useEffect(() => {
        if (!cache || !data) {
            fetchData()
        }
    }, [dispatch, ...deps])

    return {
        data, error, loading, fetchData
    }
}