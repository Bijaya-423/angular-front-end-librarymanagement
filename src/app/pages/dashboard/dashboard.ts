import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { BookService } from '../../core/services/book';
import { MemberService } from '../../core/services/member';
import { BorrowService } from '../../core/services/borrow';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
    private borrowService: BorrowService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.authService.getName() || 'User';
    this.userRole = this.authService.getRole() || '';
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.isMember = this.authService.isMember();

    this.loadStats();
  }

  loadStats() {
    // Load books count for all roles
    this.bookService.getAllBooks().subscribe({
      next: (books) => this.totalBooks = books.length,
      error: () => {}
    });

    // Admin stats
    if (this.isAdmin) {
      this.memberService.getAllMembers().subscribe({
        next: (members) => this.totalMembers = members.length,
        error: () => {}
      });
      this.borrowService.getAllBorrows().subscribe({
        next: (borrows) => this.totalBorrows = borrows.length,
        error: () => {}
      });
    }

    // Librarian stats
    if (this.isLibrarian) {
      this.borrowService.getAllBorrows().subscribe({
        next: (borrows) => this.totalBorrows = borrows.length,
        error: () => {}
      });
    }

    // Member stats
    if (this.isMember) {
      this.borrowService.getMyHistory().subscribe({
        next: (borrows) => this.myBorrows = borrows.length,
        error: () => {}
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}