import { Compte } from "./compte";
import { Transaction } from "./transaction";
export class Exportcompte extends Compte{
    idExportCompte!:number;
    transaction:Transaction[]=[];
}
