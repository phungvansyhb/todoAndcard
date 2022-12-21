import { Animals } from './../typeDef/Animals';
import { AxiosResponse } from "axios";
import { BaseService } from "./base.service";
import { AxiosRequestConfig } from 'axios'
import type { QueryConfig } from "../typeDef/QueryConfig";


class AnimalService extends BaseService {
    apiGetAll(param?: QueryConfig) {
        return super.apiPaginate<Animals>('/animals', param)
    }
    apiSearch(param?: QueryConfig) {
        return super.apiGet<Animals>('/animals', param)
    }
}

export default new AnimalService()
