import {Alert, Button, CircularProgress, Grid, Stack, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {RouterBreadcrumb} from "../../components/shared/RouterBreadcrumb";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createOperationThunk, getPaymentInfoThunk} from "../../store/operationSlice";
import {getAccountsThunk} from "../../store/accountSlice";
import {PaymentInfoForm} from "../../components/forms/PaymentInfoForm";
import {PaymentAmountForm} from "../../components/forms/PaymentAmountForm";
import {PaymentSubmitForm} from "../../components/forms/PaymentSubmitForm";
import {useShowSnackbar} from "../../hooks/useShowSnackbar";
import {Panel} from "../../components/panels/Panel";

const steps = [
    "Заполнение информации",
    "Сумма платежа",
    "Подтверждение",
]

export const PaymentPage = () => {
    const fields = [
        {
            name: 'number',
            title: 'Счёт',
        },
        {
            name: 'bankName',
            title: 'Банк',
        },
        {
            name: 'correctionAccount',
            title: 'Корр. счёт',
        }, {
            name: 'bik',
            title: 'БИК',
        },
        {
            name: 'inn',
            title: 'ИНН',
        },
    ]
    const {categoryName} = useParams()
    const [activeStep, setActiveStep] = useState(0)
    const [amount, setAmount] = useState('')
    const [paymentData, setPaymentData] = useState(null)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const paymentInfo = useSelector(state => state.operations.paymentInfo)
    const [isLoading, setIsLoading] = useState()
    const showSnackbar = useShowSnackbar()
    const navigate = useNavigate()
    const [selectedAccount, setSelectedAccount] = useState(null)

    useEffect(() => {
        if (!paymentInfo || paymentInfo.category.name !== categoryName) {
            fetchPaymentInfo()
        }
    }, [categoryName])

    useEffect(() => {
        if (!paymentInfo) {
            return
        }

        const initialPaymentData = {}
        paymentInfo.fields.forEach(field => {
            initialPaymentData[field.name] = ''
        })
        setPaymentData(initialPaymentData)
    }, [paymentInfo])

    async function fetchPaymentInfo() {
        setIsLoading(true)
        try {
            await dispatch(getPaymentInfoThunk({categoryName}))
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSubmit() {
        if (amount < paymentInfo.minAmount) {
            setError(`Минимальная сумма: ${paymentInfo.minAmount} руб.`)
            return
        }

        const operationData = {
            type: 'EXPENSE',
            amount,
            accountId: selectedAccount,
            category: paymentInfo.category.name,
            extraFields: [
                ...Object.entries(paymentData).map(([name, value]) => ({name, value})),
                ...fields.map(field => ({name: field.title, value: paymentInfo.accountDetails[field.name]}))
            ]
        }

        try {
            await dispatch(createOperationThunk(operationData))
            await dispatch(getAccountsThunk())
            navigate("/")
            showSnackbar("Платёж успешно совершён!")
        } catch (e) {
            showSnackbar("Платёж не совершён!")
            console.error(e)
        }
    }

    function handleNext() {
        setActiveStep(prev => prev + 1)
    }

    function handleBack() {
        setActiveStep(prev => prev - 1)
    }

    if (isLoading || !paymentInfo) {
        return <CircularProgress/>
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={!paymentInfo.accountDetails ? 8 : 7} xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <RouterBreadcrumb/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>{categoryName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid item xs={12}>
                        {activeStep === 0 ? (
                            <PaymentInfoForm paymentData={paymentData} setPaymentData={setPaymentData}
                                             paymentInfo={paymentInfo}/>
                        ) : activeStep === 1 ? (
                            <PaymentAmountForm paymentInfo={paymentInfo} amount={amount} setAmount={setAmount}
                                               setSelectedAccount={setSelectedAccount}
                                               selectedAccount={selectedAccount}/>
                        ) : (
                            <PaymentSubmitForm onClick={handleSubmit}/>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {!error ? null : <Alert severity={"error"} variant={"outlined"}>{error}</Alert>}
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Button
                                onClick={handleBack}
                                color={"primary"}
                                disabled={activeStep === 0}
                            >Назад</Button>
                            <Button
                                onClick={handleNext}
                                color={"primary"}
                                disabled={activeStep === steps.length - 1}
                            >Далее</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            {!paymentInfo.accountDetails ? null : (
                <Grid item md={5} xs={12}>
                    <Panel>
                        <Typography mb={2} variant={"h5"}>Детали платежа</Typography>
                        <Stack spacing={2}>
                            {fields.map(field => (
                                <Stack key={field.name}>
                                    <Typography>{field.title}</Typography>
                                    <Typography>{paymentInfo.accountDetails[field.name]}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Panel>
                </Grid>
            )}
        </Grid>
    )
}