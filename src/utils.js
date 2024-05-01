import {
    Add,
    Close,
    CreditCard,
    CurrencyRuble,
    Error,
    Payment,
    PhoneAndroid,
    Savings,
    SwapHoriz,
    Whatshot
} from "@mui/icons-material";
import {Sector} from "recharts";
import {NumericFormat, numericFormatter, PatternFormat} from "react-number-format";
import React from "react";
import {useSnackbar} from "notistack";
import {IconButton, TextField} from "@mui/material";

export function getAccountAvatarIcon(accountType) {
    if (accountType === 'CREDIT') {
        return <CreditCard/>
    } else if (accountType === 'SAVINGS') {
        return <Savings/>
    }
    return <CurrencyRuble/>
}

export function getAccountTitle(accountType) {
    switch (accountType) {
        case 'CREDIT':
            return 'Кредитный'
        case 'SAVINGS':
            return 'Сберегательный'
        case 'CHECKING':
            return 'Расчётный'
    }
}

export function getOperationIconByCategory(op) {
    if (op.status === 'FAILED') {
        return <Error/>
    }

    switch (op.category.name) {
        case 'Пополнение':
            return <Add/>
        case 'Снятие':
            return <Payment/>
        case 'Перевод':
            return <SwapHoriz/>
        case 'Мобильная связь':
            return <PhoneAndroid/>
        case 'Газ':
            return <Whatshot/>
    }
    return <CurrencyRuble/>
}

export function convertDateTime(inputString) {
    const date = new Date(inputString)

    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = date.toLocaleDateString('ru-RU', options)

    const optionsTime = {hour: '2-digit', minute: '2-digit'}
    const formattedTime = date.toLocaleTimeString('ru-RU', optionsTime)

    return `${formattedDate}, ${formattedTime}`
}

export function convertDate(inputString) {
    const date = new Date(inputString)

    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = date.toLocaleDateString('ru-RU', options)

    return `${formattedDate}`
}

export const renderActiveShape = (props) => {
    const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value} = props;

    return (
        <g>
            <text x={cx} y={cy} dy={-5} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
                {payload.value} ₽
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
        </g>
    );
};

export function CustomPatternFormat({value, onChange, format, ...other}) {
    return <PatternFormat
        {...other}
        format={format}
        value={value}
        onValueChange={values => {
            onChange({
                target: values
            })
        }}
        customInput={TextField}
    />
}

export function CustomNumericFormat({value, onChange, format, ...other}) {
    return <NumericFormat
        {...other}
        value={value}
        onValueChange={values => {
            onChange({
                target: values
            })
        }}
        customInput={TextField}
        thousandSeparator={' '}
        decimalSeparator={','}
    />
}

export const moneyInputFormatter = (numString, options = {}) => numericFormatter(numString, {
    thousandSeparator: ' ',
    suffix: ' ₽',
    ...options,
})

export const MoneyInputFormat = React.forwardRef(
    function MoneyInputFormat(props) {
        const {onChange, ...other} = props
        return <NumericFormat
            {...other}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    }
                })
            }}
            thousandSeparator={' '}
            decimalSeparator={','}
            allowedDecimalSeparators={['.']}
            decimalScale={2}
            prefix={"₽ "}
            valueIsNumericString
        />
    }
)

export function useShowSnackbar() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    return function showSnackbar(text, variant = 'success') {
        const key = enqueueSnackbar(text, {
            variant: variant,
            action: () => <IconButton sx={{color: 'white'}} onClick={() => closeSnackbar(key)}><Close/></IconButton>
        })
    }
}