import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login-services/login.service';
import { Observable, catchError, map, of } from 'rxjs';
import { AlertsService } from 'src/app/helpers/alerts.service';
import { general_path } from 'src/app/constants/ROUTES';
import { icon_class } from 'src/assets/icons_class/icon_class';
import { common_login } from 'src/app/transalation/es/common/common_message_login_es';
import { common_error } from 'src/app/transalation/es/common/common_message_error_es';

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
