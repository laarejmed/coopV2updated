import {UserItemModel} from './user-item-model';

export class UserInfoModel {
  cif!: string;
  name!: string;
  phone!: string;
  balance!: number;
  email!: string;
  socialnumber!: string;

  setInfo(user: UserItemModel) {
    this.cif = user.cif;
    this.name = user.name;
    this.phone = user.phone;
    this.socialnumber = user.socialNumber;
    
  }
}
