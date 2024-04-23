import {Add, CreditCard, CurrencyRuble, Payment, Savings, SwapHoriz} from "@mui/icons-material";

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
            return <Add />
        case 'Снятие':
            return <Payment />
        case 'Перевод':
            return <SwapHoriz />
    }
    return <CurrencyRuble />
}

export function convertDateTime(inputString) {
    const date = new Date(inputString)

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = date.toLocaleDateString('ru-RU', options)

    const optionsTime = { hour: '2-digit', minute: '2-digit' }
    const formattedTime = date.toLocaleTimeString('ru-RU', optionsTime)

    return `${formattedDate}, ${formattedTime}`
}

export function convertDate(inputString) {
    const date = new Date(inputString)

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = date.toLocaleDateString('ru-RU', options)

    return `${formattedDate}`
}