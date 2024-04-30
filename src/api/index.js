import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
})

instance.interceptors.response.use(
    function (config) {
        return config
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 410) {
                console.warn("JWT token expired")
                localStorage.removeItem("auth_token")
            }
        } else {
            console.error(error)
        }
        return Promise.reject(error)
    }
)

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

async function getOperations(accountId = null) {
    let url = "/operations"
    if (accountId !== null) {
        url += '?accountId=' + accountId
    }
    const response = await instance.get(url)
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

    setToken(token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        localStorage.setItem('auth_token', token)
    },

    removeToken() {
        delete instance.defaults.headers.common['Authorization']
        localStorage.removeItem('auth_token')
    },
}
