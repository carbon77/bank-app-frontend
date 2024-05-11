import {apiClient} from "./index";

const accountService = {
    async getAccounts() {
        const response = await apiClient.get("/account/mine")
        return response.data
    },

    async createAccount(accountData) {
        const response = await apiClient.post("/account", accountData)
        return response.data
    },

    async createCard(accountId) {
        const response = await apiClient.post(`/account/${accountId}/card`)
        return response.data
    },

    async deleteCard(accountId, cardId) {
        const response = await apiClient.delete(`/account/${accountId}/card/${cardId}`)
        return response.data
    },

    async patchAccount({accountId, data}) {
        return await apiClient.patch(`/account/${accountId}`, data)
    },

    async patchCard({accountId, cardId, data}) {
        return await apiClient.patch(`/account/${accountId}/card/${cardId}`, data)
    },
}

export default accountService