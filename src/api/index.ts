import axios, {AxiosInstance} from "axios";
import keycloak from "../auth/keycloak.ts";

export const apiClient: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || "http://localhost:8080"}/api`,
})

apiClient.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer " + keycloak.token
    return config
}, error => {
    return Promise.reject(error)
})
