import { Admin } from "./admin";
import { Status } from "./status";
import { User } from "./user";
import { Virement } from "./virement";
export class Demande {
    idDemande!:number;
    description!:string;
    typeDescription!:string;
    status!:Status;
    admin!:Admin;
    virement:Virement[]=[];
    user!:User;
}
