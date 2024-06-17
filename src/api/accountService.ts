import {apiClient} from "./index.ts"
import {Account} from "../types/models";
import {CreateAccountRequest, CreateAccountResponse, PatchAccountRequest, PatchCardRequest} from "../types/api";

const accountService = {
    async getAccounts(): Account[] {
        const response = await apiClient.get("/account/mine")
        return response.data
    },

    async createAccount(accountData: CreateAccountRequest): CreateAccountResponse {
        const response = await apiClient.post("/account", accountData)
        return response.data
    },

    async createCard(accountId: number): number {
        const response = await apiClient.post(`/account/${accountId}/card`)
        return response.data
    },

    async deleteCard(accountId: number, cardId: number) {
        const response = await apiClient.delete(`/account/${accountId}/card/${cardId}`)
        return response.data
    },

    async patchAccount({accountId, data}: { accountId: number, data: PatchAccountRequest }) {
        return await apiClient.patch(`/account/${accountId}`, data)
    },

    async patchCard({accountId, cardId, data}: { accountId: number, cardId: number, data: PatchCardRequest }) {
        return await apiClient.patch(`/account/${accountId}/card/${cardId}`, data)
    },
}

export default accountService