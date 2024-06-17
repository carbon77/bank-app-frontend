import {AccountType, OperationCategory, OperationField, OperationStatus, OperationType, Passport} from "./models";
import Any = jasmine.Any;

export type LoginRequest = {
    email: string,
    password: string,
}

export type RegisterRequest = {
    email: string,
    password: string,
    phoneNumber: string,
    passport: Passport,
}

export type PatchUserRequest = {
    email: string,
    phoneNumber: string,
}

export type ChangePasswordRequest = [
    password: string,
    newPassword: string,
]

export type CreateAccountRequest = {
    accountType: AccountType,
    name: string,
    extraFields?: Record<String, Any>,
}

export type PatchAccountRequest = {
    name?: string,
    closed?: boolean,
}

export type PatchCardRequest = {
    blocked?: boolean,
}

export type CreateOperationRequest = {
    type: OperationType,
    amount: number,
    extraFields?: OperationField[],
    accountId: number,
    category: OperationCategory,
    status: OperationStatus,
}

export type CreateTransferRequest = {
    senderAccountId: number,
    recipientCard: String,
    amount: number,
    message: string,
}


export type AuthResponse = {
    token: string,
}

export type CreateAccountResponse = {
    accountId: number,
}