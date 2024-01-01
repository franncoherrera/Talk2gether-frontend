import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-services/login.service';
import { Observable, catchError, map, of } from 'rxjs';
import { AlertsService } from 'src/app/helpers/alerts.service';
import {
  common_error,
  common_login,
} from 'src/app/transalation/es/COMMON_MESSAGES_es';
import { general_path } from 'src/app/constants/ROUTES';
import { icon_class } from 'src/assets/icons_class/icon_class';

@Component({
  selector: 'app-login-disabled',
  templateUrl: './login-disabled.component.html',
  styleUrls: ['./login-disabled.component.scss'],
})
export class LoginDisabledComponent implements OnInit {
  reasonReports$: Observable<string[]>;
  common_login = common_login;
  icon_class = icon_class;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.reasonReports$ = this.loginService.getReason().pipe(
      map((reasonReports) => reasonReports),
      catchError((error) => {
        this.alertService.errorAlert(common_error.general_error_title, error);
        return of([]);
      })
    );
  }

  redirectMainPage() {
    this.router.navigate([general_path.main_path]);
  }
}
