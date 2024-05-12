import {apiClient} from "./index";

const userService = {
    async getUser() {
        const response = await apiClient.get("/users/me")
        return response.data
    },

    async findUserByCardNumber(cardNumber) {
        const response = await apiClient.get(`/users/findByCard?cardNumber=${cardNumber}`)
        return response.data
    },

    async patchUser(patchData) {
        const response = await apiClient.patch('/users', patchData)
        return response.data
    },

    async changePassword({ password, newPassword }) {
        const response = await apiClient.patch('/users/changePassword', {
            password,
            newPassword
        })
        return response.data
    }
 }

export default userService