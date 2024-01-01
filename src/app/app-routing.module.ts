import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificarCuentaComponent } from './modules/common/common-verify-account/verificar-cuenta/verificar-cuenta.component';
import { CuentaVerificadaComponent } from './modules/common/common-verify-account/cuenta-verificada/cuenta-verificada.component';
import { RegistroPadreComponent } from './modules/common/common-register/registro-padre.component';
import { TerminosComponent } from './modules/common/common-register/terminos/terminos.component';
import { PantallaInicioBusquedaComponent } from './modules/common/common-room-search/pantalla-inicio-busqueda/pantalla-inicio-busqueda.component';
import { HomePageComponent } from './modules/common/common-home-page/home-page.component';
import { SinFuncionarComponent } from './shared/not-working-layout/sin-funcionar.component';
import { AuthGuard } from './security/auth-guard.guard';
import { VisualizarPerfilComponent } from './modules/common/common-profile-view/visualizar-perfil/visualizar-perfil.component';
import { NuevaContraseniaComponent } from './modules/common/common-change-password/nueva-contrasenia/nueva-contrasenia.component';
import { ConfirmarContraseniaComponent } from './modules/common/common-change-password/confirmar-contrasenia/confirmar-contrasenia.component';
import { BloqueadoComponent } from './modules/common/common-profile-view/bloqueado/bloqueado.component';
import { loggedGuard } from './security/logged.guard';
import { ChatPadreComponent } from './modules/common/common-chat/chat-padre.component';
import { RankingComponent } from './modules/common/common-room-search/ranking/ranking.component';
import { ReunionVirtualComponent } from './modules/common/common-room-search/reunion-virtual/reunion-virtual.component';
import { SideBarAyudaComponent } from './shared/help-side-bar/side-bar-ayuda.component';
import { CuentaEliminadaComponent } from './modules/common/common-profile-configuration/cuenta-eliminada/cuenta-eliminada.component';
import { ChatPadreAbiertoComponent } from './modules/common/common-chat/chat-padre-abierto.component';
import { ConfiguracionPadreComponent } from './modules/common/common-profile-configuration/configuracion-padre.component';
import { blockedRoutes } from './security/blocked-routes';
import { LogrosComponent } from './modules/common/common-profile-view/logros/logros.component';
import { EstadisticasComponent } from './modules/common/common-profile-view/estadisticas/estadisticas.component';
import { SideBarComponent } from './modules/admin/administrador/side-bar/side-bar.component';
import { DashboardAdministradorComponent } from './modules/admin/administrador/dashboard-administrador/dashboard/dashboard-administrador.component';
import { general_path } from './constants/ROUTES';
import { AppComponent } from './app.component';
import { CommonLoginModule } from './modules/common/common-login/common-login.module';

const routes: Routes = [
  {
    path: general_path.main_path,
    component: HomePageComponent,
  },
  {
    path: general_path.main_path,
    loadChildren: () => CommonLoginModule,
  },

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
  { path: 'proximamente', component: SinFuncionarComponent },
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
