import { Time } from "@angular/common";
import { Compte } from "./compte";
import { Client } from "./client";
import { Demande } from "./demande";
import { Status } from "./status";
import { User } from "./user";
export class Virement {
    idVirement!:number;
    dateVirement!:Date;
    heureVirement!:Time;
    CompteSource!:string;
    typeVirement!:string;
    desciprion!:string;
    compte!:Compte;
    client!:Client;
    demande!:Demande;
    status!:Status;
    user!:User;
}
