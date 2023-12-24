import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificarCuentaComponent } from './modules/common/verificar-cuenta/verificar-cuenta/verificar-cuenta.component';
import { CuentaVerificadaComponent } from './modules/common/verificar-cuenta/cuenta-verificada/cuenta-verificada.component';
import { RegistroPadreComponent } from './modules/common/registro/registro-padre.component';
import { TerminosComponent } from './modules/common/registro/terminos/terminos.component';
import { PantallaInicioBusquedaComponent } from './modules/common/inicio/pantalla-inicio-busqueda/pantalla-inicio-busqueda.component';
import { LoginComponent } from './modules/common/login/login/login.component';
import { PrincipalComponent } from './modules/common/pantalla-principal/principal/principal.component';
import { RecuperarContraseniaComponent } from './modules/common/recuperar-contrasenia/recuperar-contrasenia.component';
import { SinFuncionarComponent } from './shared/not-working-layout/sin-funcionar.component';
import { AuthGuard } from './security/auth-guard.guard';
import { LoginInhabilitadoComponent } from './modules/common/login/login-inhabilitado/login-inhabilitado.component';
import { VisualizarPerfilComponent } from './modules/common/visualizar-perfil/visualizar-perfil/visualizar-perfil.component';
import { NuevaContraseniaComponent } from './modules/common/cambio-contrasenia/nueva-contrasenia/nueva-contrasenia.component';
import { ConfirmarContraseniaComponent } from './modules/common/cambio-contrasenia/confirmar-contrasenia/confirmar-contrasenia.component';
import { BloqueadoComponent } from './modules/common/visualizar-perfil/bloqueado/bloqueado.component';
import { loggedGuard } from './security/logged.guard';
import { ChatPadreComponent } from './modules/common/chat/chat-padre.component';
import { RankingComponent } from './modules/common/inicio/ranking/ranking.component';
import { ReunionVirtualComponent } from './modules/common/inicio/reunion-virtual/reunion-virtual.component';
import { SideBarAyudaComponent } from './shared/side-bar-ayuda/side-bar-ayuda.component';
import { CuentaEliminadaComponent } from './modules/common/configuracion/cuenta-eliminada/cuenta-eliminada.component';
import { ChatPadreAbiertoComponent } from './modules/common/chat/chat-padre-abierto.component';
import { ConfiguracionPadreComponent } from './modules/common/configuracion/configuracion-padre.component';
import { blockedRoutes } from './security/blocked-routes';
import { LogrosComponent } from './modules/common/visualizar-perfil/logros/logros.component';
import { EstadisticasComponent } from './modules/common/visualizar-perfil/estadisticas/estadisticas.component';
import { SideBarComponent } from './modules/admin/administrador/side-bar/side-bar.component';
import { DashboardAdministradorComponent } from './modules/admin/administrador/dashboard-administrador/dashboard/dashboard-administrador.component';

const routes: Routes = [
  {
    path: 'registro',
    component: RegistroPadreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inicio',
    component: PantallaInicioBusquedaComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'reunion-virtual',
    component: ReunionVirtualComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'configuracion',
    component: ConfiguracionPadreComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'cuenta-eliminada',
    component: CuentaEliminadaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ranking',
    component: RankingComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'terminos-y-condiciones',
    component: TerminosComponent,
    canActivate: [AuthGuard],
  },
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
  { path: '', component: PrincipalComponent },
  { path: 'proximamente', component: SinFuncionarComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'recuperarContrasenia',
    component: RecuperarContraseniaComponent,
    canActivate: [AuthGuard],
  },
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
  {
    path: 'bloqueado',
    component: LoginInhabilitadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfilUsuario/:id',
    component: VisualizarPerfilComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'perfilUsuario/logros/:id',
    component: LogrosComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'perfilUsuario/estadisticas/:id',
    component: EstadisticasComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'usuarioBloqueado',
    component: BloqueadoComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'administrador',
    component: SideBarComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'administrador/:redireccion',
    component: SideBarComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'estadisticasPlataforma',
    component: DashboardAdministradorComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  {
    path: 'administrador/:redireccion/:id',
    component: SideBarComponent,
    canActivate: [loggedGuard],
  },
  {
    path: 'chat',
    component: ChatPadreComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
  { path: 'ayuda/:seccion', component: SideBarAyudaComponent },
  {
    path: 'chat/:id',
    component: ChatPadreAbiertoComponent,
    canActivate: [loggedGuard, blockedRoutes],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
