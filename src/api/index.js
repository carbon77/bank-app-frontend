import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
})

async function login({email, password}) {
    const response = await instance.post("/auth/login", {
        email,
        password
    })
    instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    return response.data
}

async function register(userData) {
    const response = await instance.post("/auth/register", userData)
    instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    return response.data
}

async function getAuthorizedUser() {
    const response = await instance.get("/users/me")
    return response.data
}

export const apiClient = {
    login,
    register,
    getAuthorizedUser,
}
