import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Interest } from '../register-models/interest';

@Injectable({
  providedIn: 'root',
})
export class InteresesService {
  obtenerInteresesURL = environment.apiUrl + 'intereses/listarinteresesactivos';

  constructor(private httpClient: HttpClient) {}

  obtenerIntereses() {
    return this.httpClient.get<Interest[]>(this.obtenerInteresesURL);
  }
}
