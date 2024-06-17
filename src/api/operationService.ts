import {apiClient} from "./index.ts";
import {CreateOperationRequest, CreateTransferRequest} from "../types/api";
import {CategoryGroupDto, Operation, OperationMonthDto, OperationType, PaymentInfo} from "../types/models";

const operationService = {
    async createOperation(operationData: CreateOperationRequest) {
        const response = await apiClient.post("/operations", operationData)
        return response.data
    },

    async getOperations({
                            accountIds = null,
                            page = 0,
                            size = 10,
                            startDate = null,
                            endDate = null,
                            type = null,
                        }: {
        accountIds?: number[],
        startDate?: any,
        endDate?: any,
        type?: OperationType,
        page: number,
        size: number,
    }): {
        totalPages: number,
        totalElements: number,
        content: Operation[],
    } {
        const response = await apiClient.get('/operations', {
            params: {
                accountIds: (!accountIds || accountIds.length === 0) ? null : accountIds.join(','),
                startDate: startDate?.format(),
                endDate: endDate?.format(),
                page,
                size,
                type,
            }
        })
        return response.data
    },

    async createTransfer(transferData: CreateTransferRequest) {
        const response = await apiClient.post("/operations/transfer", transferData)
        return response.data
    },

    async findPaymentInfo(categoryName: string): PaymentInfo {
        const response = await apiClient.get(`/payments/info/${categoryName}`)
        return response.data
    },

    async getOperationCategoryGroups({
                                         accountIds = null,
                                         startDate = null,
                                         endDate = null
                                     }: {
        accountIds?: number[],
        startDate?: any,
        endDate?: any,
    }): CategoryGroupDto[] {
        const params = {
            params: {
                accountIds: (!accountIds || accountIds.length === 0) ? null : accountIds.join(','),
                startDate: startDate?.format(),
                endDate: endDate?.format(),
            },
        }
        const response = await apiClient.get("/operations/stats/categories", params)
        return response.data
    },

    async getOperationStatsByMonths({
                                        accountIds = null,
                                        startDate = null,
                                        endDate = null
                                    }: {
        accountIds?: number[],
        startDate?: any,
        endDate?: any,
    }): OperationMonthDto[] {
        const params = {
            params: {
                accountIds: (!accountIds || accountIds.length === 0) ? null : accountIds.join(','),
                startDate: startDate?.format(),
                endDate: endDate?.format(),
            },
        }
        const response = await apiClient.get("/operations/stats/months", params)
        return response.data
    },
}

export default operationService