import {Compte} from "./compte";
import {UserItemModel} from "./user-item-model";
export class UserBankItemModel extends UserItemModel{
  compte!: Compte;
}
