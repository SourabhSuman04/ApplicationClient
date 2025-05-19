import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { authGuard } from './Component/helper/auth.guard';
import { UserformComponent } from './Component/User/userform/userform.component';
import { UserdetailsComponent } from './Component/User/userdetails/userdetails.component';
import { UsertableComponent } from './Component/User/usertable/usertable.component';
import { UsersignComponent } from './Component/auth/usersign/usersign.component';
import { UsersignupComponent } from './Component/auth/usersignup/usersignup.component';
import { ForgotComponent } from './Component/auth/forgot/forgot.component';
import { UnitwiseComponent } from './Component/UnitwiseTAble/unitwise/unitwise.component';
import { DashboredhomeComponent } from './Component/dashboredhome/dashboredhome.component';
import { HomeComponent } from './Component/home/home.component';
import { OdnpauploadComponent } from './Component/UnitwiseTAble/odnpaupload/odnpaupload.component';
import { StatewiseComponent } from './Component/UnitwiseTAble/statewise/statewise.component';
import { XbucketUnitWiseComponent } from './Component/UnitwiseTAble/xbucket-unit-wise/xbucket-unit-wise.component';
import { XbucketStateWiseComponent } from './Component/UnitwiseTAble/xbucket-state-wise/xbucket-state-wise.component';
import { AuthCallbackComponent } from './Component/auth/auth-callback/auth-callback.component';
export const routes: Routes = [
    {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboredhomeComponent },
      { path: 'dashboardhome', component: HomeComponent },
      { path: 'add-user', component: UserformComponent },
      { path: 'edit/:id', component: UserformComponent },
      { path: 'userview/:id', component: UserdetailsComponent },
      { path: 'usertable', component: UsertableComponent },
      { path: 'unitwise', component: UnitwiseComponent },
      { path: 'odnpaupload', component: OdnpauploadComponent },
      { path: 'statewise', component: StatewiseComponent },
      { path: 'xbucketunitwise', component: XbucketUnitWiseComponent },
      { path: 'xbucketstatewise', component: XbucketStateWiseComponent }
    ]
  },
  { path: 'signin', component: UsersignComponent },
  { path: 'signup', component: UsersignupComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
