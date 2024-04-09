import { Compte } from "./compte";
import { User } from "./user";
export class Client extends User{
    idClient!:number;
    compte:Compte[]=[];
}
