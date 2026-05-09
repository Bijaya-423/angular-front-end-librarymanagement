import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  today = new Date().toISOString().split('T')[0]; // ← added

  constructor(
    private borrowService: BorrowService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.borrowService.getMyHistory().subscribe({
      next: (data) => this.borrows = data,
      error: () => this.showError('Failed to load history')
    });
  }

  returnBook(borrowId: number) {
    if (confirm('Confirm return this book?')) {
      this.borrowService.returnBook(borrowId).subscribe({
        next: () => {
          this.showSuccess('Book returned successfully!');
          this.loadHistory();
        },
        error: (err) => this.showError(
          err.error?.error || 'Return failed')
      });
    }
  }

  countByStatus(status: string): number {
    return this.borrows.filter(b => b.status === status).length;
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    this.errorMsg = '';
    setTimeout(() => this.successMsg = '', 4000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    this.successMsg = '';
    setTimeout(() => this.errorMsg = '', 4000);
  }
}