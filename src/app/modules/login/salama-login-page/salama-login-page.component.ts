import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-salama-login-page',
  templateUrl: './salama-login-page.component.html',
  styleUrls: ['./salama-login-page.component.scss']
})
export class SalamaLoginPageComponent {
  loginId: string = '';
  password: string = '';
  rememberMe: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  onLogin(): void {
    this.submitted = true;

    if (!this.loginId || !this.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please enter both Login ID and Password.',
        life: 3000
      });
      return;
    }

    this.loading = true;

    // Simulate API call
    setTimeout(() => {
      this.loading = false;

      // Demo: accept any credentials
      this.messageService.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: `Welcome back, ${this.loginId}!`,
        life: 3000
      });

      // Navigate to dashboard
      // this.router.navigate(['/dashboard']);

    }, 1500);
  }
}
