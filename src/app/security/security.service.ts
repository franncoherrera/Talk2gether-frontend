import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  url: string = environment?.apiUrl;

  constructor(private httpClient: HttpClient) {}

  traerRutasPermitidas() {
    const urlEndpoint = this.url + 'permisos/listarPermisosParaUnRol';
    return this.httpClient.get(urlEndpoint);
  }
}
