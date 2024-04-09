import { Demande } from "./demande";
import { Transaction } from "./transaction";
import { Transfere } from "./transfere";
import { User } from "./user";
import { Virement } from "./virement";
export class Status {
    idStatus!:number;
    TypeStatus!:string;
    user!:User;
    virement:Virement[]=[];
    transfere:Transfere[]=[];
    demande!:Demande;
    transaction:Transaction[]=[];
    message!: string;
}
