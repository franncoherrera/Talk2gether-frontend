import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  url: string = environment?.apiUrl;

  constructor(private httpClient:HttpClient) { }

  opcionesPais() {
    return this.httpClient.get(
      this.url + 'paises/listarpaisesactivos'
    );
  }

  opcionesIdiomas() {
    return this.httpClient.get(
      this.url + 'idiomas/listaridiomasactivos'
    );
  }

  opcionesNivelIdiomas() {
    return this.httpClient.get(
      this.url + 'nivelesidioma/listarnivelesidiomaactivos'
    );
  }

  obtenerIntereses() {
    return this.httpClient.get(
      this.url + 'intereses/listarinteresesactivos'
    );
  }
}
