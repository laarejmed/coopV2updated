import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtServiceService} from '../../shared/service/jwt-service.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  lang: any;
  public selectedLanguage: string | undefined;
  public languages = [
    { name: 'English', code:'en', flag:'us' },
    { name: 'French', code:'fr', flag:'fr' },
    { name: 'Spanish', code:'es', flag:'es' }
  ]
  constructor(private jwt: JwtServiceService, private router: Router, private translateService: TranslateService) {
  }
  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  }
  setActiveClass(e: Event) {
    document.querySelectorAll('.sb-nav-link-icon').forEach(icon => {
      (icon as HTMLElement).style.color = '';
    });
    const clickedIcon = (<HTMLElement>e.currentTarget).querySelector('.sb-nav-link-icon');
    if (clickedIcon) {
        (clickedIcon as HTMLElement).style.color = 'green';
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    (<HTMLElement>e.currentTarget).classList.add('active');
    document.querySelector('.mat-typography').classList.remove('sb-sidenav-toggled');
  }
  linkShown() {
    return !this.jwt.isAdmin() || (this.jwt.isAdmin() && !this.jwt.switchBtn);
  }
  linkAdminShown() {
    return this.jwt.isAdmin() && this.jwt.switchBtn;
  }
  public selectLanguage(language: string): void {
    this.selectedLanguage = language;
    console.log('Selected language', language);
  }
  changeLanguage(lang: any) {
    localStorage.setItem('lang', lang);
    this.translateService.use(this.lang);
    window.location.reload();
  }
}
