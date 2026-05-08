import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BorrowService } from '../../../core/services/borrow';
import { AuthService } from '../../../core/services/auth';
import { Borrow } from '../../../models/borrow.model';

@Component({
  selector: 'app-borrow-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrow-list.html',
  styleUrl: './borrow-list.css'
})
export class BorrowListComponent implements OnInit {

  borrows: Borrow[] = [];
  successMsg = '';
  errorMsg = '';
  userName = '';
  userRole = '';
  isAdmin = false;
  isLibrarian = false;

  constructor(
    private borrowService: BorrowService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.authService.getName() || '';
    this.userRole = this.authService.getRole() || '';
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.loadBorrows();
  }

  loadBorrows() {
    this.borrowService.getAllBorrows().subscribe({
      next: (data) => this.borrows = data,
      error: () => this.errorMsg = 'Failed to load borrow records'
    });
  }

  approve(id: number) {
    this.borrowService.approveBorrow(id).subscribe({
      next: () => {
        this.successMsg = 'Borrow approved!';
        this.loadBorrows();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => this.errorMsg = 'Approve failed'
    });
  }

  reject(id: number) {
    this.borrowService.rejectBorrow(id).subscribe({
      next: () => {
        this.successMsg = 'Borrow rejected!';
        this.loadBorrows();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => this.errorMsg = 'Reject failed'
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}