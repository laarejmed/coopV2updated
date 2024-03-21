import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserItemModel} from 'src/app/shared/models/user-item-model';
import {ItemsModel} from 'src/app/shared/models/items-model';
import {JwtService} from 'src/app/shared/services/jwt.service';
import {UserService} from 'src/app/shared/services/user-service.service';
import Swal from 'sweetalert2';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { CreateuserPopupComponent } from '../createuser-popup/createuser-popup.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @ViewChild(UserPopupComponent) userPopupComponent: UserPopupComponent | undefined;
  @ViewChild(CreateuserPopupComponent) createuserPopupComponent: CreateuserPopupComponent | undefined;

  readonly pageSize = 10;
  currentPage: number;
  listUser: Array<string>;
  userItems: ItemsModel<UserItemModel>;
  pageNumber: Array<number>;
  temoin: boolean = true;
  totalPages: number=0;
  status = [
    '<strong>Progreso</strong>',
    '<strong class="text-success">Aprobado</strong>',
    '<strong class="text-danger text-capitalize">Rechazado</strong>',
  ];
  isConnected = true;
  hasAdminRole = true;
  userBankAccountId: number;
  switchBtn: boolean;

  constructor(
    public dialog: MatDialog,
    private jwt: JwtService,
    private router: Router,
    private userService: UserService
  ) {
    this.listUser = new Array<string>();
    this.userItems = new ItemsModel<UserItemModel>();
    this.pageNumber = [];
    this.currentPage = 0;
    this.hasAdminRole = this.jwt.isAdmin();
    this.isConnected = this.jwt.isConnected();
    this.switchBtn = this.jwt.switchBtn;
  }

  ngOnInit(): void {
    this.getItems(0);
  }
  getDisplayedPageNumbers() {
    this.totalPages = Math.ceil(this.userItems.itemsNumber / this.pageSize);
    const currentPage = this.currentPage;
    const maxDisplayedPages = 5;
    const startPage = Math.max(0, currentPage - Math.floor(maxDisplayedPages / 2));
    const endPage = Math.min(this.totalPages - 1, startPage + maxDisplayedPages - 1);
    const displayedPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    return displayedPages;
  }

  openDialog(cif:any) {
    this.jwt.switchBtn = false;
    this.jwt.updateswitchBtnUId(cif);
    this.dialog.open(UserPopupComponent);

  }
  openDialogUser() {
    this.dialog.open(CreateuserPopupComponent);
  }
  refresh() {this.getItems(0); }

  getItems(num: number) {
    this.userService.getUsers(num).subscribe(
      (res) => {
        Object.assign(this.userItems, res);
        this.userService.progressNumber = this.userItems.progressNumber;
        console.log(this.userService.progressNumber);
        let result = Math.trunc(this.userItems.itemsNumber / this.pageSize);
        if (this.userItems.itemsNumber % this.pageSize != 0) {
          result++;
        }
        this.pageNumber = Array.from(Array(result).keys());
        this.currentPage = num;
      },
      (err) => {
        if ([401, 403].includes(err['status'])) {
          this.router.navigateByUrl('/dashboard/global');
        } else {
          Swal.fire({
            title: 'Hay un problema!!!',
            text: err['error'],
            icon: 'error',
          });
        }
      }
    );
    window.scrollTo(0, 0);
  }

  selectAll(e: Event) {
    let items = document.querySelectorAll('.items');
    for (let i = 0; i < items.length; i++) {
      (<HTMLInputElement>items[i]).checked = (<HTMLInputElement>(
        e.target
      )).checked;
      let id = (<HTMLInputElement>items[i]).value;
      this.toggleItem(id, (<HTMLInputElement>e.target).checked);
    }
  }

  setUser(id: string, e: Event) {
    this.toggleItem(id, (<HTMLInputElement>e.target).checked);
  }

  toggleItem(id: string, isChecked: boolean) {
    let elt = document.querySelector('.dataTable-dropdown');
    if (isChecked) {
      this.listUser.push(id);
    } else {
      let index = this.listUser.indexOf(id);
      this.listUser.splice(index, 1);
    }
    if (this.listUser.length != 0) {
      elt.classList.remove('d-none');
    } else {
      elt.classList.add('d-none');
    }
    console.log(this.listUser);
  }
  goToAccount(cif: any) {
    this.jwt.switchBtn = false;
    this.jwt.updateswitchBtnUId(cif);
    setTimeout(() => {
      this.jwt.switchBtn
        ? this.router.navigateByUrl('/dashboard/users')
        : this.router.navigateByUrl('/dashboard/global');
    });
  }

  uncheckAll() {
    document.querySelectorAll('.dataTable-table input[type=checkbox]').forEach((element) => {
      (<HTMLInputElement> element).checked = false;
    });
    document.querySelector('.dataTable-dropdown').classList.add('d-none');
  }

  isNotProgress()
  {
    console.log(this.userItems.items.filter((elt) => this.listUser.includes(elt.cif) && elt.status == '1') == null);
    return this.userItems.items.filter((elt) => this.listUser.includes(elt.cif) && elt.status == '1') == null;
  }

  validateUser(cif: string) {
    this.listUser.length = 0;
    this.listUser.push(cif);
    this.validateAll();
  }

  rejectUser(cif: string) {
    this.listUser.length = 0;
    this.listUser.push(cif);
    this.rejectAll();
  }

  deleteUser(cif: string) {
    this.listUser.length = 0;
    this.listUser.push(cif);
    this.deleteAll();
  }

  //importation

  exportToCSV() {
    if (this.isConnected && this.hasAdminRole && this.switchBtn) {
      this.userService.importAllUsersAsCsv();
    }
  }

  exportToExcel() {
    if (this.isConnected && this.hasAdminRole && this.switchBtn) {
      this.userService.importAllUsersAsExcel();
    }
  }

  exportToPDF() {
    if (this.isConnected && this.hasAdminRole && this.switchBtn) {
      this.userService.importAllUsersAsPdf();
    }
  }

  validateAll() {
    this.userService.validateUsers(this.listUser).subscribe(
      (res) => {
        let num = 0;
        this.userItems.items.map((u) => {
          if (this.listUser.includes(u.cif)) {
            u.status == '0' && num++;
            u.status = '1';
          }
        });
        console.log(num);
        this.userService.progressNumber = this.userService.progressNumber - num;
        this.listUser.length = 0;
        this.uncheckAll();
        Swal.fire({
          title: 'Éxito!!!',
          text: res['message'],
          icon: 'success',
        });
      },
      (err) => {
        this.listUser.length = 0;
        this.uncheckAll();
        Swal.fire({
          title: 'Hay un problema !!!',
          text: err['error'],
          icon: 'error',
        });
      }
    );
  }

  rejectAll() {
    this.userService.rejectUsers(this.listUser).subscribe(
      (res) => {
        let num = 0;
        this.userItems.items.map((u) => {
          if (this.listUser.includes(u.cif)) {
            u.status == '0' && num++;
            u.status = '2';
          }
        });
        console.log(num);
        this.userService.progressNumber = this.userService.progressNumber - num;
        this.listUser.length = 0;
        this.uncheckAll();
        Swal.fire({
          title: 'Éxito!!!',
          text: res['message'],
          icon: 'success',
        });
      },
      (err) => {
        this.listUser.length = 0;
        this.uncheckAll();
        Swal.fire({
          title: 'Hay un problema !!!',
          text: err['error'],
          icon: 'error',
        });
      }
    );
  }

  deleteAll() {
    this.userService.deleteUsers(this.listUser).subscribe(
      (res) => {
        let num = 0;
        this.userItems.items = this.userItems.items.filter((u) => {
          (this.listUser.includes(u.cif) && u.status == '0') && num++;
          return !this.listUser.includes(u.cif);
        });
        console.log(num);
        this.userService.progressNumber = this.userService.progressNumber - num;
        this.listUser.length = 0;
        this.uncheckAll();
        Swal.fire({
          title: 'Éxito!!!',
          text: res['message'],
          icon: 'success',
        });
      },
      (err) => {
        this.listUser.length = 0;
        this.uncheckAll();
        Swal.fire({
          title: 'Hay un problema !!!',
          text: err['error'],
          icon: 'error',
        });
      }
    );
  }

  setActiveClass(i: number) {
    let current = document.querySelector('.pagination-items.active');
    current.classList.remove('active');
    document.querySelectorAll('.pagination-items')[i].classList.add('active');
  }

  searchItem(e: Event) {
    let value = (<HTMLInputElement>e.target).value;
    if (value != '') {
      this.userService.searchUser(value).subscribe(
        (res) => {
          this.userItems.items = [...res];
        },
        (err) => {
          Swal.fire({
            title: 'Hay un problema!!!',
            text: err['error'],
            icon: 'error',
          });
        }
      );
    } else {
      this.getItems(this.currentPage);
    }
  }
}
