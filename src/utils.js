import {
    Add,
    CarCrash,
    CreditCard,
    CurrencyRuble,
    DirectionsBus,
    ElectricBolt,
    Error,
    Payment,
    PhoneAndroid,
    Receipt,
    Savings,
    SwapHoriz,
    WaterDrop,
    Whatshot,
    Wifi
} from "@mui/icons-material";
import {NumericFormat, numericFormatter, PatternFormat} from "react-number-format";
import React from "react";
import {TextField} from "@mui/material";

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
        case 'Водоснабжение':
            return <WaterDrop/>
        case 'Электроэнергия':
            return <ElectricBolt/>
        case 'Интернет':
            return <Wifi/>
        case 'Штрафы ГИБДД':
            return <CarCrash/>
        case 'По реквизитам':
            return <Receipt/>
        case 'Транспортая карта':
            return <DirectionsBus/>
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