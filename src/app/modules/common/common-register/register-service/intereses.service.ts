import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Interest } from '../register-models/Interest';

@Injectable({
  providedIn: 'root',
})
export class InteresesService {
  url: string = environment?.apiUrl;

  constructor(private httpClient: HttpClient) {}

  obtenerIntereses() {
    return this.httpClient.get<Interest[]>(
      this.url + 'intereses/listarinteresesactivos'
    );
  }
}
