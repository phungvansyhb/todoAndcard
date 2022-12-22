import { Animals } from './../typeDef/Animals';
import { BaseService } from "./base.service";


class AnimalService extends BaseService<Animals> {

}

export default new AnimalService('animals')
