import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BorrowService } from '../../../core/services/borrow';
import { AuthService } from '../../../core/services/auth';
import { Borrow } from '../../../models/borrow.model';

@Component({
  selector: 'app-borrow-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrow-history.html',
  styleUrl: './borrow-history.css'
})
export class BorrowHistoryComponent implements OnInit {

  borrows: Borrow[] = [];
  successMsg = '';
  errorMsg = '';
  userName = '';

  constructor(
    private borrowService: BorrowService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.authService.getName() || '';
    this.loadHistory();
  }

  loadHistory() {
    this.borrowService.getMyHistory().subscribe({
      next: (data) => this.borrows = data,
      error: () => this.errorMsg = 'Failed to load history'
    });
  }

  returnBook(borrowId: number) {
    if (confirm('Return this book?')) {
      this.borrowService.returnBook(borrowId).subscribe({
        next: () => {
          this.successMsg = 'Book returned successfully!';
          this.loadHistory();
          setTimeout(() => this.successMsg = '', 3000);
        },
        error: () => this.errorMsg = 'Return failed'
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}