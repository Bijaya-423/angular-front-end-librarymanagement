import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.loading = true;
    this.errorMsg = '';

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token, res.role, res.name);
          this.redirectByRole(res.role);
        },
        error: () => {
          this.errorMsg = 'Invalid email or password!';
          this.loading = false;
        }
      });
  }

  redirectByRole(role: string) {
    if (role === 'ADMIN') {
      this.router.navigate(['/dashboard/admin']);
    } else if (role === 'LIBRARIAN') {
      this.router.navigate(['/dashboard/librarian']);
    } else {
      this.router.navigate(['/dashboard/member']);
    }
  }
}