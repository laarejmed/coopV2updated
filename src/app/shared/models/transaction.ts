import { Time } from "@angular/common";
import { InternCompte } from "./intern-compte";
import { Exportcompte } from "./exportcompte";
import { Admin } from "./admin";
import { Status } from "./status";
export class Transaction {
    idtransaction!:number;
    dateTransaction!:Date;
    heuretransaction!:Time;
    montant!:number;
    typeTransaction!:string;
    description!:string;
    internCompte!:InternCompte;
    ExportCompte!:Exportcompte;
    admin!:Admin;
    status!:Status;
}
