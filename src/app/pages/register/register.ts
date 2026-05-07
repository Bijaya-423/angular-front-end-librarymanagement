import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  member: Member = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'MEMBER'
  };

  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.register(this.member).subscribe({
      next: () => {
        this.successMsg = 'Registered successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMsg = 'Registration failed. Email may already exist.';
        this.loading = false;
      }
    });
  }
}