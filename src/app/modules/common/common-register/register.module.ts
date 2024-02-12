import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteresesModalComponent } from './register-components/register-user-step-2/intereses-modal/intereses-modal.component';
import { TermsConditionComponent } from './register-components/term-and-conditions/term-and-condition.component';
import { RegisterMainModule } from './register-components/register-main.module';
import { RegisterMainComponent } from './register-components/register-main.component';
import { AuthGuard } from 'src/app/security/auth-guard.guard';
import { RouterModule, Routes } from '@angular/router';
import { routes_path } from 'src/app/constants/ROUTES';

export const register_routes: Routes = [
  {
    path: routes_path.register_path,
    component: RegisterMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: routes_path.terms_path,
    component: TermsConditionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [InteresesModalComponent],
  imports: [
    CommonModule,
    RegisterMainModule,
    RouterModule.forChild(register_routes),
  ],
  exports: [InteresesModalComponent],
})
export class RegisterModule {}
