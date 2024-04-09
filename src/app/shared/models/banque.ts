import { Compte } from "./compte";
import { User } from "./user";
export class Banque {
    idBanque!:number;
    nom!:string;
    adresse!:string;
    user:User[]=[];
    compte:Compte[]=[];
}
