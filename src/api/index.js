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

async function createOperation(operationData) {
    const response = await instance.post("/operations", operationData)
    return response.data
}

export const apiClient = {
    login,
    register,
    getUser: getAuthorizedUser,
    getAccounts,
    createAccount,
    createOperation,

    setToken(token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        localStorage.setItem('auth_token', token)
    },

    removeToken() {
        delete instance.defaults.headers.common['Authorization']
        localStorage.removeItem('auth_token')
    },
}
