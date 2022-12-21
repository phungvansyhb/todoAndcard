import { AxiosResponse } from 'axios';
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import type { QueryConfig } from "../typeDef/QueryConfig";
const ApiUrl = import.meta.env.VITE_APP_API_URL
import {toast} from 'react-hot-toast'

export class BaseService {
    axiosInstance = axios
    constructor(baseUrl?: string, timeOut?: number) {
        this.axiosInstance.defaults.baseURL = ApiUrl
        if (timeOut) {
            this.axiosInstance.defaults.timeout = timeOut
        }
        this.axiosInstance.interceptors.response.use(response => {
            toast.success('Call api success')                
            return response.data
        }, error => {
            toast.error('Call api success')                
            return Promise.reject(error);
        })
    };
    apiPaginate<T>(endpoint: string, parameter?: QueryConfig) {
        return axios.get(endpoint, { params: parameter }) as Promise<{data: T[] , count:number}>
    }
    apiGet<T>(endpoint: string, parameter?: QueryConfig) {
        return axios.get(endpoint, { params: parameter }) as Promise<T[]>
    }
    apiPost(endpoint: string, body: any, config?: AxiosRequestConfig) {
        return axios.post(endpoint, body, config)
    }
    apiDelete(endpoint: string, parameter: { id: number | string }) {
        return axios.delete(endpoint, { params: parameter })
    }
}

// export default new BaseService()