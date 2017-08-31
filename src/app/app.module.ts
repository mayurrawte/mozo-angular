import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import {RoutingModule} from './routing.module';
import {
  MdMenuModule, MdButtonModule, MdIconModule, MdInputModule, MdCardModule, MdDialogModule,
  MdSelectModule, MdProgressSpinnerModule
} from '@angular/material';
import { LandingpageComponent } from './home/landingpage/landingpage.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {UtilService} from './util.service';
import {HttpModule} from '@angular/http';
import {Angular2SocialLoginModule} from 'angular2-social-login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BackendService} from './backend.service';
import { DashMainComponent } from './dashboard/dash-main/dash-main.component';
import { ExpenseComponent } from './dashboard/expense/expense.component';
import { FriendsComponent } from './dashboard/friends/friends.component';
import { DialogComponent } from './dialog/dialog.component';
import { Page404Component } from './page404/page404.component';
import {TransactionComponent} from './dashboard/transaction/transaction.component';
import { SettingComponent } from './dashboard/setting/setting.component';
import { BalanceComponent } from './dashboard/balance/balance.component';
import {AuthGardGuard} from './auth-gard.guard';
import * as CryptoJS from '../../node_modules/crypto-js';

const providers = {
  'google': {
    'clientId': '162580582454-ilhdk165c35rtmt8vdev06te9h0pnf06.apps.googleusercontent.com'
  },
  'facebook': {
    'clientId': '349654535448035',
    'apiVersion': 'v2.10'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    LandingpageComponent,
    SideNavComponent,
    DashMainComponent,
    ExpenseComponent,
    TransactionComponent,
    FriendsComponent,
    DialogComponent,
    Page404Component,
    SettingComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MdMenuModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    HttpModule,
    Angular2SocialLoginModule,
    ReactiveFormsModule,
    FormsModule,
    MdDialogModule,
    MdSelectModule,
    MdProgressSpinnerModule
  ],
  exports: [
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [UtilService, BackendService, AuthGardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
