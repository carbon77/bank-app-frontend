import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAccountsThunk} from "../store/accountSlice";

export const useAccounts = () => {
    const accounts = useSelector(state => state.accounts.accounts)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                await dispatch(getAccountsThunk())
            } catch (e) {
                setError("Не удалось получить счета")
            } finally {
                setLoading(false)
            }
        }

        if (!accounts) {
            fetchData()
        } else {
            setLoading(false)
        }
    }, [accounts])

    return {
        accounts,
        error,
        loading,
    }
}