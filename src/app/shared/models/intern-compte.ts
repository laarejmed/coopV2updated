import { Compte } from "./compte";
import { Transaction } from "./transaction";
export class InternCompte extends Compte{
    idInternCompte!:number;
    transaction:Transaction[]=[];
}
