import { NgModule } from '@angular/core';
import { LoginModule } from './login-components/login/login.module';
import { LoginDisabledModule } from './login-components/login-disabled/login-disabled.module';
import { RouterModule, Routes } from '@angular/router';
import { routes_path } from 'src/app/constants/ROUTES';
import { LoginComponent } from './login-components/login/login.component';
import { AuthGuard } from 'src/app/security/auth-guard.guard';
import { LoginDisabledComponent } from './login-components/login-disabled/login-disabled.component';

export const login_routes: Routes = [
  {
    path: routes_path.login_path,
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: routes_path.user_bloqued_by_admin,
    component: LoginDisabledComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    LoginModule,
    LoginDisabledModule,
    RouterModule.forChild(login_routes)
  ],
  providers: [],
})
export class CommonLoginModule {}
