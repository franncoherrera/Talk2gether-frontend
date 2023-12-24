import { CommonModule, TitleCasePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SpinnerCargaGeneralModule } from './shared/spinner-carga-general/spinner-carga-general.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AUTH_TOKEN } from './interceptors/auth.token';
import { SesionService } from './interceptors/sesion.service';
import { CambioContraseniaModule } from './modules/common/common-change-password/cambio-contrasenia.module';
import { InicioModule } from './modules/common/common-room-search/inicio.module';
import { LoginModule } from './modules/common/common-login/login-module.module';
import { PantallaPrincipalModule } from './modules/common/common-main-page/pantalla-principal.module';
import { RecuperarContraseniaModule } from './modules/common/common-recover-password/recuperar-contrasenia.module';
import { RegistroModule } from './modules/common/common-register/registro.module';
import { VerificarCuentaModule } from './modules/common/common-verify-account/verificar-cuenta.module';
import { SeguirModalModule } from './modules/common/common-profile-view/seguir-modal/seguir-modal.module';
import { SinFuncionarComponent } from './shared/not-working-layout/sin-funcionar.component';
import { ChatModule } from './modules/common/common-chat/chat.module';
import { SideBarAyudaModule } from './shared/side-bar-ayuda/side-bar-ayuda.module';
import { PregFreqModule } from './modules/common/common-help-section/preg-freq.module';
import { ConfiguracionModule } from './modules/common/common-profile-configuration/configuracion.module';
import { ReportarUsuarioModalModule } from './modules/common/common-profile-view/reportar-usuario-modal/reportar-usuario-modal.module';
import { ModuloAdministradorModule } from './modules/admin/administrador/modulo-administrador.module';
import { CalificarUsuarioModule } from './modules/common/common-rate-user/calificar-usuario.module';

@NgModule({
  declarations: [AppComponent, SinFuncionarComponent],

  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    RegistroModule,
    VerificarCuentaModule,
    InicioModule,
    AppRoutingModule,
    NavbarModule,
    LoginModule,
    RecuperarContraseniaModule,
    PantallaPrincipalModule,
    CambioContraseniaModule,
    SeguirModalModule,
    SpinnerCargaGeneralModule,
    ModuloAdministradorModule,
    CalificarUsuarioModule,
    ReportarUsuarioModalModule,
    ChatModule,
    SideBarAyudaModule,
    PregFreqModule,
    ConfiguracionModule,
  ],
  providers: [
    SesionService,
    {
      provide: AUTH_TOKEN,
      useValue:
        JSON.parse(localStorage.getItem('currentSession'))?.token || null,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    TitleCasePipe,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
