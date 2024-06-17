export type Passport = {
    number: string,
    series: string
    issueDate: Date,
    firstName: string,
    lastName: string,
    patronymic: string,
    departmentCode: string,
    birthday: Date,
}

export type User = {
    id: number,
    email: string,
    emailVerified: boolean,
    phoneNumber: string,
    passport: Passport,
}

export type Card = {
    id: number,
    number: string,
    expirationDate: Date,
    svv: number,
    blocked: boolean,
}

export type AccountDetails = {
    number: string,
    bankName: string,
    bik: string,
    correctionAccount: string,
    inn: string,
}

export type AccountType = "SAVINGS" | "CREDIT" | "CHECKING"

export type Account = {
    id: number,
    name: string,
    balance: number,
    closed: boolean,
    accountType: AccountType,
    createdAt: Date,
    cards: Card[],
    accountDetails: AccountDetails,

    // Credit account
    accountLimit?: number,
    interestRate?: number,

    // Savings account
    rate?: number,
}

export type OperationCategory = {
    id: number,
    name: string,
}

export type OperationStatus = "SUCCESS" | "FAILED"
export type OperationType = "RECEIPT" | "EXPENSE"

export type OperationField = {
    name: string,
    value: any,
}

export type Operation = {
    id: number,
    type: OperationType,
    status: OperationStatus,
    amount: number,
    extraFields: OperationField[],
    createdAt: Date,
    category: OperationCategory,
    accountId: number,
}

export type CategoryGroupDto = {
    category: OperationCategory,
    type: OperationType,
    totalAmount: number,
}

export type OperationMonthDto = {
    month: Date,
    type: OperationType,
    total: number,
}

export type PaymentFieldType = "STRING" | "NUMBER" | "CHOICE"

export type PaymentField = {
    name: string,
    description: string,
    type: PaymentFieldType,
    pattern?: string,
    maxLength?: number,
    minLength?: number,
    maxValue?: number,
    minValue?: number,
    suffix?: string,
    choices?: string[],
}

export type PaymentInfo = {
    id: number,
    minAmount: number,
    category: OperationCategory,
    accountDetails: AccountDetails,
    fields: PaymentField[],
}
