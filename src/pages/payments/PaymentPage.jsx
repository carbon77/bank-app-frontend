import {Button, Grid, InputAdornment, Stack, Step, StepLabel, Stepper, TextField, Typography} from "@mui/material";
import {RouterBreadcrumb} from "../../components/RouterBreadcrumb";
import React, {useEffect, useState} from "react";
import {Panel} from "../../components/Panel";
import {CustomNumericFormat, CustomPatternFormat, MoneyInputFormat, useShowSnackbar} from "../../utils";
import {Check} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createOperationThunk, getPaymentInfoThunk} from "../../store/operationSlice";
import {AccountSelect} from "../../components/AccountSelect";
import {getAccountsThunk} from "../../store/accountSlice";

function PaymentInfoForm({paymentInfo, paymentData, setPaymentData}) {
    function handleDataChange(field) {
        return e => {
            setPaymentData({
                ...paymentData,
                [field]: e.target.value,
            })
        }
    }

    if (!paymentInfo || !paymentData) {
        return <div>Loading...</div>
    }

    return (
        <Panel>
            <Typography variant={"h5"} mb={2}>Введите данные</Typography>
            <Stack spacing={2}>
                {paymentInfo.fields.map(field => {
                    const inputProps = {
                        key: field.name,
                        label: field.name,
                        value: paymentData[field.name],
                        onChange: handleDataChange(field.name),
                        format: field.pattern,
                        size: "small",
                        helperText: field.description,
                        InputProps: {
                            startAdornment: field.prefix ?
                                <InputAdornment position={'start'}>{field.prefix}</InputAdornment> : null,
                            endAdornment: field.suffix ?
                                <InputAdornment position={'end'}>{field.suffix}</InputAdornment> : null,
                        }
                    }

                    if (field.type === 'NUMBER') {
                        return <CustomNumericFormat {...inputProps}/>
                    }

                    if (!field.pattern) {
                        return <TextField {...inputProps} />
                    }

                    return <CustomPatternFormat {...inputProps}/>
                })}
            </Stack>
        </Panel>
    )
}

function PaymentAmountForm({amount, setAmount, selectedAccount, setSelectedAccount}) {
    return (
        <Panel>
            <Stack spacing={2}>

                <Typography variant={"h5"} mb={2}>Введите сумму платежа</Typography>
                <AccountSelect value={selectedAccount}
                               onChange={(e) => setSelectedAccount(e.target.value)}/>
                <TextField
                    label={"Сумма"}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    InputProps={{
                        inputComponent: MoneyInputFormat,
                    }}
                />
            </Stack>
        </Panel>
    )
}

function PaymentSubmitElement({onClick}) {
    return (
        <Panel>
            <Typography variant={"h5"} mb={2}>Подтвердите платёж</Typography>
            <Button onClick={onClick} color={"primary"} startIcon={<Check/>} size={"large"}>Оплатить</Button>
        </Panel>
    )
}

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
            initialPaymentData[field.name] = field.type === 'STRING' ? '' : ''
        })
        setPaymentData(initialPaymentData)
    }, [paymentInfo])

    async function fetchPaymentInfo() {
        setIsLoading(true)
        try {
            await dispatch(getPaymentInfoThunk({categoryName}))
        } catch (e) {
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
                            <PaymentSubmitElement onClick={handleSubmit}/>
                        )}
                    </Grid>
                    <Grid item md={12}>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Button onClick={handleBack} color={"primary"} disabled={activeStep === 0}>Назад</Button>
                            <Button onClick={handleNext} color={"primary"}
                                    disabled={activeStep === steps.length - 1}>Далее</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}