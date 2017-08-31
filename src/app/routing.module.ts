import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './home/register/register.component';
import {LoginComponent} from './home/login/login.component';
import {LandingpageComponent} from './home/landingpage/landingpage.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashMainComponent} from './dashboard/dash-main/dash-main.component';
import {ExpenseComponent} from './dashboard/expense/expense.component';
import {FriendsComponent} from './dashboard/friends/friends.component';
import {Page404Component} from './page404/page404.component';
import {TransactionComponent} from './dashboard/transaction/transaction.component';
import {SettingComponent} from './dashboard/setting/setting.component';
import {BalanceComponent} from './dashboard/balance/balance.component';
import {AuthGardGuard} from './auth-gard.guard';


const approutes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: '', component: LandingpageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}
  ]
  },
  {path: 'dash', component: DashboardComponent, canActivate: [AuthGardGuard], children: [
    {path: '', component: DashMainComponent},
    {path: 'expense', component: ExpenseComponent},
    {path: 'transactions', component: TransactionComponent},
    {path: 'friends', component: FriendsComponent},
    {path: 'settings', component: SettingComponent},
    {path: 'balance', component: BalanceComponent}
  ]},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(approutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
