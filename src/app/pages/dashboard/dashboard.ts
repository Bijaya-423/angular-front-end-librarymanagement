import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { BookService } from '../../core/services/book';
import { MemberService } from '../../core/services/member';
import { BorrowService } from '../../core/services/borrow';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  userName = '';
  userRole = '';
  isAdmin = false;
  isLibrarian = false;
  isMember = false;
  totalBooks = 0;
  totalMembers = 0;
  totalBorrows = 0;
  myBorrows = 0;

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private memberService: MemberService,
    private borrowService: BorrowService
  ) {}

  ngOnInit() {
    this.userName = this.authService.getName() || '';
    this.userRole = this.authService.getRole() || '';
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.isMember = this.authService.isMember();
    this.loadStats();
  }

  loadStats() {
    this.bookService.getAllBooks().subscribe({
      next: (books) => this.totalBooks = books.length,
      error: () => {}
    });

    if (this.isAdmin) {
      this.memberService.getAllMembers().subscribe({
        next: (m) => this.totalMembers = m.length,
        error: () => {}
      });
      this.borrowService.getAllBorrows().subscribe({
        next: (b) => this.totalBorrows = b.length,
        error: () => {}
      });
    }

    if (this.isLibrarian) {
      this.borrowService.getAllBorrows().subscribe({
        next: (b) => this.totalBorrows = b.length,
        error: () => {}
      });
    }

    if (this.isMember) {
      this.borrowService.getMyHistory().subscribe({
        next: (b) => this.myBorrows = b.length,
        error: () => {}
      });
    }
  }
}