import { NgModule } from '@angular/core';
import { VerificarCuentaComponent } from './verificar-cuenta/verificar-cuenta.component';
import { CuentaVerificadaComponent } from './cuenta-verificada/cuenta-verificada.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/security/auth-guard.guard';

export const verify_account_routes: Routes = [
  {
    path: 'verificar-cuenta',
    component: VerificarCuentaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cuenta-verificada',
    component: CuentaVerificadaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [VerificarCuentaComponent, CuentaVerificadaComponent],
  imports: [
    RouterModule.forChild(verify_account_routes),
  ],
})
export class VerificarCuentaModule {}
