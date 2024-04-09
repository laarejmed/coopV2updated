import { Banque } from "./banque";
import { Client } from "./client";
import { Virement } from "./virement";
export class Compte {
    idCompte!:number;
    numCompte!:number;
    dateCreation!:Date;
    solde!:number;
    nomCompte!:string;
    description!:string;
    typeCompte!:string;
    ressponsableCompte!:string;
    banque!:Banque;
    client!:Client;
    virement:Virement[]=[];
}
