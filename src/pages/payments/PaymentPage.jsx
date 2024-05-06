import {Button, Grid, Stack, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {RouterBreadcrumb} from "../../components/shared/RouterBreadcrumb";
import React, {useEffect, useState} from "react";
import {useShowSnackbar} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createOperationThunk, getPaymentInfoThunk} from "../../store/operationSlice";
import {getAccountsThunk} from "../../store/accountSlice";
import {PaymentInfoForm} from "../../components/forms/PaymentInfoForm";
import {PaymentAmountForm} from "../../components/forms/PaymentAmountForm";
import {PaymentSubmitForm} from "../../components/forms/PaymentSubmitForm";

const steps = [
    "Заполнение информации",
    "Сумма платежа",
    "Подтверждение",
]

export const PaymentPage = () => {
    const {categoryName} = useParams()
    const [activeStep, setActiveStep] = useState(0)
    const [amount, setAmount] = useState('')
    const [paymentData, setPaymentData] = useState(null)
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
        const operationData = {
            type: 'EXPENSE',
            amount,
            accountId: selectedAccount,
            category: paymentInfo.category.name,
            extraFields: Object.entries(paymentData).map(([name, value]) => ({name, value}))
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

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={8}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <RouterBreadcrumb/>
                    </Grid>
                    <Grid item md={12}>
                        <Typography variant={"h4"}>{categoryName}</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid item md={12}>
                        {activeStep === 0 ? (
                            <PaymentInfoForm paymentData={paymentData} setPaymentData={setPaymentData}
                                             paymentInfo={paymentInfo}/>
                        ) : activeStep === 1 ? (
                            <PaymentAmountForm amount={amount} setAmount={setAmount}
                                               setSelectedAccount={setSelectedAccount}
                                               selectedAccount={selectedAccount}/>
                        ) : (
                            <PaymentSubmitForm onClick={handleSubmit}/>
                        )}
                    </Grid>
                    <Grid item md={12}>
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
        </Grid>
    )
}