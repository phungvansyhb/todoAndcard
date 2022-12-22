import { AxiosResponse } from 'axios';
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import type { QueryConfig } from "../typeDef/QueryConfig";
const ApiUrl = import.meta.env.VITE_APP_API_URL
import { toast } from 'react-hot-toast'

export class BaseService<T> {
    axiosInstance = axios
    baseURL = ApiUrl
    constructor(baseUrl?: string, timeOut?: number) {
        this.baseURL = ApiUrl + baseUrl
        this.axiosInstance.defaults.baseURL = ApiUrl + baseUrl
        if (timeOut) {
            this.axiosInstance.defaults.timeout = timeOut
        }
        this.axiosInstance.interceptors.response.use(response => {
            toast.success('Call api success')
            return response.data
        }, error => {
            console.log(error);
            toast.error('Call api error')
            return Promise.reject(error);
        })
    };
    apiSearch({ endpoint, parameter }: { endpoint?: string, parameter?: QueryConfig }) {
        return axios.get(endpoint ? endpoint : this.baseURL, { params: parameter }) as Promise<{ data: T[], count: number }>
    }

    apiDetail({ endpoint, id, parameter }: { endpoint?: string, id?: string | number, parameter?: QueryConfig }) {
        return axios.get(endpoint ? endpoint : this.baseURL + `/${id}`, { params: parameter }) as Promise<T>
    }
    apiPost({ endpoint, body }: { endpoint?: string, body?: any }) {
        return axios.post(endpoint ? endpoint : this.baseURL, body)
    }
    apiPut({ endpoint, id, body }: { endpoint?: string, id?: string | number, body?: any }) {
        return axios.put(endpoint ? endpoint : this.baseURL + `/${id}`, body) as Promise<T>
    }
    apiPatch({ endpoint, id, body }: { endpoint?: string, id?: string | number, body?: any }) {
        return axios.patch(endpoint ? endpoint : this.baseURL + `/${id}`, body)
    }

    apiDelete({ endpoint, id }: { endpoint: string, id?: string | number }) {
        return axios.delete(endpoint ? endpoint : this.baseURL + `/${id}`)
    }
}
