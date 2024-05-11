import {apiClient} from "./index";

const authService = {
    async login({email, password}) {
        const response = await apiClient.post("/auth/login", {
            email,
            password
        })
        return response.data
    },

    async register(userData) {
        const response = await apiClient.post("/auth/register", userData)
        return response.data
    },

    setToken(token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    removeToken() {
        delete apiClient.defaults.headers.common['Authorization']
    },
}

export default authService