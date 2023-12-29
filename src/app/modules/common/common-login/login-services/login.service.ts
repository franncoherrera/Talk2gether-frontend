import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SesionService } from 'src/app/interceptors/sesion.service';
import { UserSession } from '../login-models/UserSession';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = environment?.apiUrl;
  reasonReport = new BehaviorSubject<string[]>(null);
  reasonReport$ = this.reasonReport.asObservable();

  role = new BehaviorSubject<string>(null);
  role$ = this.role.asObservable();

  constructor(
    private httpClient: HttpClient,
    private sesionService: SesionService
  ) {}

  /* Endpoints del backend */
  login(email: string, password: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const urlEndpoint = this.url + 'iniciarsesion';
    const bodySession: UserSession = {
      correo: email,
      contrasenia: password,
    };
    return this.httpClient.post(urlEndpoint, bodySession, options).pipe(
      tap((tokenSession) => {
        const token = tokenSession;
        this.sesionService.startLocalSession(token);
      })
    );
  }


  /* Guardar observables */
  saveReason(reasons: string[]) {
    this.reasonReport.next(reasons);
  }
  getReason(): Observable<string[]> {
    return this.reasonReport$;
  }
  saveRole(role: string) {
    this.role.next(role);
  }
  getRole(): Observable<string> {
    return this.role$;
  }

}
