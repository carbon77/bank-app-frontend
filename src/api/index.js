import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
})

async function login({email, password}) {
    const response = await instance.post("/auth/login", {
        email,
        password
    })
    return response.data
}

async function register(userData) {
    const response = await instance.post("/auth/register", userData)
    return response.data
}

async function getAuthorizedUser() {
    const response = await instance.get("/users/me")
    return response.data
}

async function getAccounts() {
    const response = await instance.get("/account/mine")
    return response.data
}

async function createAccount(accountData) {
    const response = await instance.post("/account", accountData)
    return response.data
}

async function createCard(accountId) {
    const response = await instance.post(`/account/${accountId}/card`)
    return response.data
}

async function deleteCard(accountId, cardId) {
    const response = await instance.delete(`/account/${accountId}/card/${cardId}`)
    return response.data
}

async function createOperation(operationData) {
    const response = await instance.post("/operations", operationData)
    return response.data
}

async function getOperations({
                                 accountIds = null,
                                 page = 0,
                                 size = 5,
                                 startDate = null,
                                 endDate = null,

                             }) {
    const response = await instance.get('/operations', {
        params: {
            accountIds: (!accountIds || accountIds.length === 0) ? null : accountIds.join(','),
            startDate: startDate?.format(),
            endDate: endDate?.format(),
            page,
            size,
        }
    })
    return response.data
}

async function createTransfer(transferData) {
    const response = await instance.post("/operations/transfer", transferData)
    return response.data
}

async function findUserByCardNumber(cardNumber) {
    const response = await instance.get(`/users?bankNumber=${cardNumber}`)
    return response.data
}

async function patchUser(patchData) {
    const response = await instance.patch('/users', patchData)
    return response.data
}

async function findPaymentInfo(categoryName) {
    const response = await instance.get(`/payments/info/${categoryName}`)
    return response.data
}

async function patchAccount({accountId, data}) {
    return await instance.patch(`/account/${accountId}`, data)
}

async function patchCard({accountId, cardId, data}) {
    return await instance.patch(`/account/${accountId}/card/${cardId}`, data)
}

async function getOperationCategoryGroups({
                                              accountIds = null,
                                              startDate = null,
                                              endDate = null
                                          }) {
    const params = {
        params: {
            accountIds: (!accountIds || accountIds.length === 0) ? null : accountIds.join(','),
            startDate: startDate?.format(),
            endDate: endDate?.format(),
        },
    }
    const response = await instance.get("/operations/stats/categories", params)
    return response.data
}

async function getOperationStatsByMonths({
                                             accountIds = null,
                                             startDate = null,
                                             endDate = null
                                         }) {
    const params = {
        params: {
            accountIds: (!accountIds || accountIds.length === 0) ? null : accountIds.join(','),
            startDate: startDate?.format(),
            endDate: endDate?.format(),
        },
    }
    const response = await instance.get("/operations/stats/months", params)
    return response.data
}

export const apiClient = {
    login,
    register,
    getUser: getAuthorizedUser,
    patchUser,
    getAccounts,
    createAccount,
    createCard,
    deleteCard,
    createOperation,
    getOperations,
    findUserByCardNumber,
    createTransfer,
    findPaymentInfo,
    patchAccount,
    patchCard,
    getOperationCategoryGroups,
    getOperationStatsByMonths,

    setToken(token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    removeToken() {
        delete instance.defaults.headers.common['Authorization']
    },
}
