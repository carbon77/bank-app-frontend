import {Add, CreditCard, CurrencyRuble, Payment, Savings, SwapHoriz} from "@mui/icons-material";
import {Sector} from "recharts";
import {NumericFormat, numericFormatter, PatternFormat} from "react-number-format";
import React from "react";

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
    switch (op.category.name) {
        case 'Пополнение':
            return <Add/>
        case 'Снятие':
            return <Payment/>
        case 'Перевод':
            return <SwapHoriz/>
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

export const CustomPatternFormat = props => {
    const {onChange, ...other} = props
    return <PatternFormat
        {...other}
        onValueChange={values => {
            onChange({
                target: values,
            })
        }}
    />
}

export const moneyInputFormatter = numString => numericFormatter(numString, {
    thousandSeparator: ' ',
    suffix: ' ₽',
})

export function MoneyInputFormat(props) {
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
        prefix={"₽"}
        valueIsNumericString
    />
}