import {NgModule} from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {UserListComponent} from './user-list/user-list.component';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {RequestListComponent} from './request-list/request-list.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile/profile.component';
import {GlobalComponent} from './global/global.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TransactionPopupComponent} from './transaction-popup/transaction-popup.component';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { CreateuserPopupComponent } from './createuser-popup/createuser-popup.component';
import {TokenInterceptorServiceService} from '../shared/service/token-interceptor-service.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChartsComponent } from './charts/charts.component';
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    UserListComponent,
    TransactionListComponent,
    RequestListComponent,
    ProfileComponent,
    GlobalComponent,
    TransactionPopupComponent,
    UserPopupComponent,
    CreateuserPopupComponent,
    ChartsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorServiceService,
      multi: true,
    },
  ],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {
}
