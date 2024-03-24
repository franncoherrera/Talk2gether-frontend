import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../register-models/usuario';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  url: string = environment?.apiUrl;

  constructor(private httpClient: HttpClient) {}

  crear(usuario: Usuario): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body: Usuario = usuario;
    return this.httpClient.post(
      this.url + 'usuario/registrarse',
      body,
      {
        responseType: 'text',
      }
    );
  }

  crearReferido(usuario: Usuario, referidoValue: string): Observable<string> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body: Usuario = usuario;
    return this.httpClient.post(
      this.url + 'usuario/registrarse' + '?idCuenta=' + referidoValue,
      body,
      { responseType: 'text' }
    );
  }


}
