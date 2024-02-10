import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    CommonModule,
    BrowserModule,
    NgbModule,
    RouterModule.forChild(verify_account_routes),
  ],
})
export class VerificarCuentaModule {}
