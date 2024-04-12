import {BrowserModule} from '@angular/platform-browser';//kayne
import {NgModule} from '@angular/core';//kayne
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';//kayne
import {AppComponent} from './app.component'; //kayna
import {AppRoutingModule} from './app-routing.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';//kayne
import {LoginComponent} from './login/login.component';//kayne
import {DashboardModule} from './dashboard/dashboard.module';
import {SignupComponent} from './signup/signup.component';//kayne
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';//kayne
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component';//kayne
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import { ReceiptComponent } from './receipt/receipt.component';//kayne
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
    ],

  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
   // DashboardModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
