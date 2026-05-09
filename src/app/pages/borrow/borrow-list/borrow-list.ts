import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  filteredBorrows: Borrow[] = [];
  selectedBorrow: Borrow | null = null;
  successMsg = '';
  errorMsg = '';
  isAdmin = false;
  isLibrarian = false;
  filterStatus = 'ALL';

  constructor(
    private borrowService: BorrowService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.loadBorrows();
  }

  // GET all borrows
  loadBorrows() {
    this.borrowService.getAllBorrows().subscribe({
      next: (data) => {
        this.borrows = data;
        this.applyFilter();
      },
      error: () => this.showError('Failed to load records')
    });
  }

  // GET borrow by ID
  viewBorrow(id: number) {
    this.borrowService.getBorrowById(id).subscribe({
      next: (b) => this.selectedBorrow = b,
      error: () => this.showError('Failed to load details')
    });
  }

  // Filter by status
  applyFilter() {
    if (this.filterStatus === 'ALL') {
      this.filteredBorrows = this.borrows;
    } else {
      this.filteredBorrows = this.borrows.filter(
        b => b.status === this.filterStatus);
    }
  }

  onFilterChange(status: string) {
    this.filterStatus = status;
    this.applyFilter();
  }

  // PUT approve (Librarian)
  approve(id: number) {
    this.borrowService.approveBorrow(id).subscribe({
      next: () => {
        this.showSuccess('Borrow request approved!');
        this.loadBorrows();
      },
      error: (err) => this.showError(
        err.error?.error || 'Approve failed')
    });
  }

  // PUT reject (Librarian)
  reject(id: number) {
    this.borrowService.rejectBorrow(id).subscribe({
      next: () => {
        this.showSuccess('Borrow request rejected!');
        this.loadBorrows();
      },
      error: (err) => this.showError(
        err.error?.error || 'Reject failed')
    });
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