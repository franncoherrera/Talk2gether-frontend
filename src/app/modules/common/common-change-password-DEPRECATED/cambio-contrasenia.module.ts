import { NgModule } from '@angular/core';
import { ChangePasswordNewPasswordModule } from './chage-password-components/change-password-new-password/change-password-new-password.module';
import { RouterModule, Routes } from '@angular/router';
import { NuevaContraseniaComponent } from './chage-password-components/change-password-new-password/nueva-contrasenia.component';
import { AuthGuard } from 'src/app/security/auth-guard.guard';
import { ConfirmarContraseniaComponent } from './chage-password-components/chage-password-confirm-password/confirmar-contrasenia.component';


export const change_password_routes: Routes = [
  {
    path: 'nuevaContrasenia',
    component: NuevaContraseniaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'confirmacion',
    component: ConfirmarContraseniaComponent,
    canActivate: [AuthGuard],
  },
]


@NgModule({
  declarations: [],
  imports: [ChangePasswordNewPasswordModule, RouterModule.forChild(change_password_routes)],
})
export class CambioContraseniaModule {}
