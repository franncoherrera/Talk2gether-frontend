import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-services/login.service';

@Component({
  selector: 'app-login-disabled',
  templateUrl: './login-disabled.component.html',
  styleUrls: ['./login-disabled.component.scss'],
})
export class LoginDisabledComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  motivosReporte: string[];
  ngOnInit(): void {
    this.loginService.getReason().subscribe({
      next: (response) => (this.motivosReporte = response),
      error: (error) => (this.motivosReporte = []),
    });
  }
  menuPrincipal() {
    this.router.navigate(['']);
  }
}
