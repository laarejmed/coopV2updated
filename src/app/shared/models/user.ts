import { Banque } from "./banque";
import { Demande } from "./demande";
import { Inscription } from "./inscription";
import { LoginRequest } from "./login-request";
import { Reçue } from "./reçue";
import { Status } from "./status";
import { Transfere } from "./transfere";
import { Virement } from "./virement";
export class User {
  id!:number;
  nom!:string;
  prneom!:string;
  email!:string;
  telephone!:string;
  Numsocial!:string;
  transfere:Transfere[]=[];
  inscription!:Inscription;
  loginRequest!:LoginRequest;
  virement:Virement[]=[];
  status!:Status;
  demande:Demande[]=[];
  banque!:Banque;
  recu:Reçue[]=[];
}
