import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtServiceService} from '../../shared/service/jwt-service.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private jwt: JwtServiceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  setActiveClass(e: Event) {
    // Remove 'active' class from all icons
    document.querySelectorAll('.sb-nav-link-icon').forEach(icon => {
      (icon as HTMLElement).style.color = '';
    });

    // Add 'active' class to clicked icon
    const clickedIcon = (<HTMLElement>e.currentTarget).querySelector('.sb-nav-link-icon');
    if (clickedIcon) {
        (clickedIcon as HTMLElement).style.color = 'green';
    }

    // Remove 'active' class from all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to clicked navigation link
    (<HTMLElement>e.currentTarget).classList.add('active');

    // Remove 'sb-sidenav-toggled' class from '.mat-typography'
    document.querySelector('.mat-typography').classList.remove('sb-sidenav-toggled');
  }

  linkShown() {
    return !this.jwt.isAdmin() || (this.jwt.isAdmin() && !this.jwt.switchBtn);
  }

  linkAdminShown() {
    return this.jwt.isAdmin() && this.jwt.switchBtn;
  }
}
