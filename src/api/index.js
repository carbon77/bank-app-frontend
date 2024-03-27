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

export const apiClient = {
    login,
    register,
    getUser: getAuthorizedUser,

    setToken(token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        localStorage.setItem('auth_token', token)
    },

    removeToken() {
        delete instance.defaults.headers.common['Authorization']
        localStorage.removeItem('auth_token')
    },
}
