import { Component, OnInit } from '@angular/core';
import {UserInfo} from 'os';
import Swal from 'sweetalert2';
import { Updateuser } from '../../shared/models/updateuser';
import { UserInfoModel } from '../../shared/models/user-info-model';
import {UserService} from '../../shared/service/user.service';
import {JwtServiceService} from '../../shared/service/jwt-service.service';
@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent implements OnInit {
  updateuser: Updateuser;
  userInfo: UserInfoModel;
  switchUser: any;
  constructor(private userService: UserService, private jwt: JwtServiceService) {
    this.updateuser = new Updateuser();
    this.userInfo = new UserInfoModel();
    this.jwt.switchBtnUId$.subscribe(newValue => {
      this.switchUser = newValue;
    });
  }

  ngOnInit(): void {
    let UId: any = this.jwt.getConnectedUserId();
    if (this.switchUser != "initial") { UId = this.switchUser; console.log(UId); }
    this.userService.getUser(UId).subscribe(
      (res) => {
        this.userInfo.cif = res.cif;
      },
      (err) => {
        Swal.fire({
          title: 'There is probleme !!!',
          text: err['error'],
          icon: 'error',
        });
      }
    );
  }
  onSubmit() {
    console.log(this.userInfo);
    this.userService.updateUserInfo(this.userInfo).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          title: 'Información del usuario actualizada correctamente !!!',
          icon: 'success',
        });
      },
      (err) => {
        Swal.fire({
          title: 'Hay problema !!!',
          text: err['error'],
          icon: 'error',
        });
      }
    );
      }

}
