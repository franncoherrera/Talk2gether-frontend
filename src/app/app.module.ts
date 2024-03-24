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
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AUTH_TOKEN } from './interceptors/auth.token';
import { SesionService } from './interceptors/sesion.service';
import { CambioContraseniaModule } from './modules/common/common-change-password-DEPRECATED/cambio-contrasenia.module';
import { InicioModule } from './modules/common/common-room-search/inicio.module';
import { PantallaPrincipalModule } from './modules/common/common-home-page/home-page.module';
import { RegisterModule } from './modules/common/common-register/register.module';
import { VerificarCuentaModule } from './modules/common/common-verify-account-DEPRECATED/verificar-cuenta.module';
import { SeguirModalModule } from './modules/common/common-profile-view/seguir-modal/seguir-modal.module';
import { ChatModule } from './modules/common/common-chat/chat.module';
import { PregFreqModule } from './modules/common/common-help-section/preg-freq.module';
import { ConfiguracionModule } from './modules/common/common-profile-configuration/configuracion.module';
import { ReportarUsuarioModalModule } from './modules/common/common-profile-view/reportar-usuario-modal/reportar-usuario-modal.module';
import { ModuloAdministradorModule } from './modules/admin/administrador/modulo-administrador.module';
import { CalificarUsuarioModule } from './modules/common/common-rate-user/calificar-usuario.module';
import { SinFuncionarComponent } from './shared/shared-components/not-working-layout/sin-funcionar.component';
import { SideBarAyudaModule } from './shared/shared-components/help-side-bar/side-bar-ayuda.module';
import { SpinnerCargaGeneralModule } from './shared/shared-components/spinner-world-loading/spinner-carga-general.module';
import { NavbarModule } from './shared/shared-components/general-navbar/navbar.module';
import { RecuperarContraseniaModule } from './modules/common/common-recover-password-DEPRECATED/recuperar-contrasenia.module';
import { CommonLoginModule } from './modules/common/common-login/common-login.module';
import { InterestModule } from './shared/shared-components/interest-modal/interest-modal.module';

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
    RegisterModule,
    VerificarCuentaModule,
    InicioModule,
    AppRoutingModule,
    NavbarModule,
    CommonLoginModule,
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
    InterestModule
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
