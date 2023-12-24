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
import { CambioContraseniaModule } from './modules/common/cambio-contrasenia/cambio-contrasenia.module';
import { InicioModule } from './modules/common/inicio/inicio.module';
import { LoginModule } from './modules/common/login/login-module.module';
import { PantallaPrincipalModule } from './modules/common/pantalla-principal/pantalla-principal.module';
import { RecuperarContraseniaModule } from './modules/common/recuperar-contrasenia/recuperar-contrasenia.module';
import { RegistroModule } from './modules/common/registro/registro.module';
import { VerificarCuentaModule } from './modules/common/verificar-cuenta/verificar-cuenta.module';
import { SeguirModalModule } from './modules/common/visualizar-perfil/seguir-modal/seguir-modal.module';
import { SinFuncionarComponent } from './shared/not-working-layout/sin-funcionar.component';
import { CalificarUsuarioModule } from './modules/common/calificar-usuario/calificar-usuario.module';
import { ChatModule } from './modules/common/chat/chat.module';
import { SideBarAyudaModule } from './shared/side-bar-ayuda/side-bar-ayuda.module';
import { PregFreqModule } from './modules/common/preguntas-frecuentes/preg-freq.module';
import { ConfiguracionModule } from './modules/common/configuracion/configuracion.module';
import { ReportarUsuarioModalModule } from './modules/common/visualizar-perfil/reportar-usuario-modal/reportar-usuario-modal.module';
import { ModuloAdministradorModule } from './modules/admin/administrador/modulo-administrador.module';

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
