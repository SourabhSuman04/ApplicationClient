import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { DashboradHomeComponent } from './Component/dashborad.home/dashborad.home.component';
import { HomeComponent } from './Component/home/home.component';
import { SignupComponent } from './Component/Auth Component/signup/signup.component';
import { SigninComponent } from './Component/Auth Component/signin/signin.component';
import { ForgotpasswordComponent } from './Component/Auth Component/forgotpassword/forgotpassword.component';
import { UserDetailsFormComponent } from './Component/userdetials/user-details-form/user-details-form.component';
import { UserDetailsViewComponent } from './Component/userdetials/user-details-view/user-details-view.component';
import { UserTableComponent } from './Component/userdetials/user-table/user-table.component';
import { authGuard } from './Component/Auth Component/auth.guard';
import { UnitwiseComponent } from './Component/unitwise/unitwise.component';


export const routes: Routes =  [{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard],  
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboardhome', component: DashboradHomeComponent },
    { path: 'add-user', component: UserDetailsFormComponent },
    { path: 'users/view/:id', component: UserDetailsViewComponent },
    { path:'users/edit/:id',component:UserDetailsFormComponent},
    { path: 'usertable', component: UserTableComponent },
    { path:'analitics',component:UnitwiseComponent}
  ]
},
{ path: 'signup', component: SignupComponent },
{ path: 'signin', component: SigninComponent },
{ path: 'forgot', component: ForgotpasswordComponent },
{ path: '', redirectTo: 'signin', pathMatch: 'full' },
{ path: '**', redirectTo: 'dashboard' },
];