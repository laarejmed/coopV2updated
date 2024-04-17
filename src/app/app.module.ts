import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Pipe} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component'; 
import {AppRoutingModule} from './app-routing.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LoginComponent} from './login/login.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {SignupComponent} from './signup/signup.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { NotificationComponent } from './notification/notification.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { pipe } from 'rxjs';
import { NgStyle } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatButtonModule } from '@angular/material/button';
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    PageNotFoundComponent,
    EmailConfirmationComponent,
    ResetPasswordComponent,
    ReceiptComponent,
    NotificationComponent,
    ChartComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
   // DashboardModule,
    AppRoutingModule,
    Pipe,
    NgStyle,
    NgModule,
    HttpClientModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
