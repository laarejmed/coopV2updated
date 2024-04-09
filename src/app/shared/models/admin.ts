import { Archive } from "./archive";
import { Compte } from "./compte";
import { Transaction } from "./transaction";
import { User } from "./user";
export class Admin extends User{
    idAdmin!:number;
    compte:Compte[]=[];
    transaction:Transaction[]=[];
    archive:Archive[]=[];
}
