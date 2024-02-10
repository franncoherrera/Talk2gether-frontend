import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperarContraseniaComponent } from './recuperar-contrasenia.component';
import { RecuperarContraseniaFormComponent } from './recuperar-contrasenia-form/recuperar-contrasenia-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecuperarContraseniaConfirmacionComponent } from './recuperar-contrasenia-confirmacion/recuperar-contrasenia-confirmacion.component';
import { RouterModule, Routes } from '@angular/router';
import { routes_path } from 'src/app/constants/ROUTES';
import { AuthGuard } from 'src/app/security/auth-guard.guard';

export const recover_password_routes: Routes = [
  {
    path: routes_path.recover_pass_path,
    component: RecuperarContraseniaComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [
    RecuperarContraseniaComponent,
    RecuperarContraseniaFormComponent,
    RecuperarContraseniaConfirmacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(recover_password_routes),

  ]
})
export class RecuperarContraseniaModule { }
