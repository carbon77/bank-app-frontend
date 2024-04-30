import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {useState} from "react";
import {AddCard, CreditCard} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {createAccountThunk, getAccountsThunk} from "../../store/accountSlice";
import {Alert, LoadingButton} from "@mui/lab";
import {getAccountTitle, MoneyInputFormat, useShowSnackbar} from "../../utils";
import {useNavigate} from "react-router-dom";

export function CreateAccountPage() {
    const [accountType, setAccountType] = useState('')
    const [rate, setRate] = useState('16')
    const [accountLimit, setAccountLimit] = useState('300000')
    const [interestRate, setInterestRate] = useState('16')
    const [accountName, setAccountName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const theme = useTheme()
    const dispatch = useDispatch()
    const showSnackbar = useShowSnackbar()
    const navigate = useNavigate()

    const handleAccountTypeChange = (event) => {
        if (accountName === '' || accountName === getAccountTitle(accountType)) {
            setAccountName(getAccountTitle(event.target.value))
        }
        setAccountType(event.target.value)
    }

    const handleRateChange = (event) => {
        setRate(event.target.value)
    }

    const handleAccountLimitChange = (event) => {
        setAccountLimit(event.target.value)
    }

    const handleInterestRateChange = (event) => {
        setInterestRate(event.target.value)
    }

    const onCreateAccountSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            await dispatch(createAccountThunk({
                accountType,
                name: accountName,
                extraFields: {
                    accountLimit: Number.parseFloat(accountLimit),
                    rate: Number.parseFloat(rate),
                    interestRate: Number.parseFloat(interestRate),
                }
            }))
        } catch (e) {
            setErrorMessage(e.message)
        } finally {
            setIsLoading(false)
        }
        dispatch(getAccountsThunk())
        showSnackbar("Счёт успешно создан!")
        navigate("/")
    }

    return (
        <Container maxWidth={"xs"}>
            <CssBaseline/>
            <Paper elevation={2} noValidate sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '2em'
            }}>
                <Avatar
                    sx={{bgcolor: theme.palette.primary.main, width: 50, height: 50}}
                ><CreditCard/></Avatar>
                <Typography variant={"h5"}>Открытие счёта</Typography>

                <Box component={"form"} noValidate sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '2em',
                    width: '100%',
                }} onSubmit={onCreateAccountSubmit}>
                    <FormControl fullWidth>
                        <InputLabel id={"account-type-select"}>Тип счёта</InputLabel>
                        <Select
                            labelId="account-type-select"
                            value={accountType}
                            onChange={handleAccountTypeChange}
                            label="Тип счёта"
                        >
                            <MenuItem value={'CHECKING'}>Расчётный</MenuItem>
                            <MenuItem value={'SAVINGS'}>Накопительный</MenuItem>
                            <MenuItem value={'CREDIT'}>Кредитный</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Название"
                        value={accountName}
                        onChange={e => setAccountName(e.target.value)}
                        type={"text"}
                    />

                    {accountType === 'SAVINGS' &&
                        <TextField
                            fullWidth
                            label="Ставка"
                            value={rate}
                            onChange={handleRateChange}
                            disabled
                        />
                    }

                    {accountType === 'CREDIT' &&
                        <>
                            <TextField
                                fullWidth
                                label="Кредитный лимит"
                                value={accountLimit}
                                onChange={handleAccountLimitChange}
                                InputProps={{
                                    inputComponent: MoneyInputFormat,
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Процентная ставка"
                                value={interestRate}
                                onChange={handleInterestRateChange}
                                disabled
                            />
                        </>
                    }

                    {!errorMessage ? null : (
                        <Alert severity={"error"}>{errorMessage}</Alert>
                    )}

                    <LoadingButton
                        type="submit"
                        size={"large"}
                        variant="contained"
                        loading={isLoading}
                        loadingPosition="end"
                        endIcon={<AddCard/>}
                    >
                        Открыть счёт
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    )
}