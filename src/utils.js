import {CreditCard, CurrencyRuble, Savings} from "@mui/icons-material";

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