import {apiClient} from "./index.ts";
import {User} from "../types/models";
import {ChangePasswordRequest, PatchUserRequest} from "../types/api";

const userService = {
    async findUserByCardNumber(cardNumber: string): User {
        const response = await apiClient.get(`/users/findByCard?cardNumber=${cardNumber}`)
        return response.data
    },

    async patchUser(patchData: PatchUserRequest) {
        const response = await apiClient.patch('/users', patchData)
        return response.data
    },

    async changePassword({oldPassword, newPassword}: ChangePasswordRequest) {
        const response = await apiClient.post('/users/changePassword', {
            oldPassword,
            newPassword
        })
        return response.data
    }
}

export default userService