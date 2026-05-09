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
  availableBooks = 0;
  totalMembers = 0;
  adminCount = 0;
  librarianCount = 0;
  memberCount = 0;
  totalBorrows = 0;
  pendingBorrows = 0;
  approvedBorrows = 0;
  returnedBorrows = 0;
  rejectedBorrows = 0;
  myBorrows = 0;
  myPending = 0;
  myReturned = 0;

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
    // Books — all roles
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.totalBooks = books.length;
        this.availableBooks = books.filter(
          b => (b.availableCopies ?? 0) > 0).length;
      }
    });

    // Admin & Librarian stats
    if (this.isAdmin || this.isLibrarian) {
      this.memberService.getAllMembers().subscribe({
        next: (members) => {
          this.totalMembers = members.length;
          this.adminCount = members.filter(m => m.role === 'ADMIN').length;
          this.librarianCount = members.filter(
            m => m.role === 'LIBRARIAN').length;
          this.memberCount = members.filter(
            m => m.role === 'MEMBER').length;
        }
      });

      this.borrowService.getAllBorrows().subscribe({
        next: (borrows) => {
          this.totalBorrows = borrows.length;
          this.pendingBorrows = borrows.filter(
            b => b.status === 'PENDING').length;
          this.approvedBorrows = borrows.filter(
            b => b.status === 'APPROVED').length;
          this.returnedBorrows = borrows.filter(
            b => b.status === 'RETURNED').length;
          this.rejectedBorrows = borrows.filter(
            b => b.status === 'REJECTED').length;
        }
      });
    }

    // Member stats
    if (this.isMember) {
      this.borrowService.getMyHistory().subscribe({
        next: (borrows) => {
          this.myBorrows = borrows.length;
          this.myPending = borrows.filter(
            b => b.status === 'PENDING').length;
          this.myReturned = borrows.filter(
            b => b.status === 'RETURNED').length;
        }
      });
    }
  }
}