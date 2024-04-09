import { Admin } from "./admin";
import { Status } from "./status";
import { User } from "./user";
export class Transfere {
    idTransfere!:number;
    DateTransfere!:Date;
    Montant!:number;
    description!:string;
    user!:User;
    admin!:Admin;
    status!:Status;
}
