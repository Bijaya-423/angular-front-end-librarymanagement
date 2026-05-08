import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { BookService } from '../../../core/services/book';
import { BorrowService } from '../../../core/services/borrow';
import { AuthService } from '../../../core/services/auth';
import { Book } from '../../../models/book.model';

declare var bootstrap: any;

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchTerm = '';
  successMsg = '';
  errorMsg = '';
  isEditing = false;
  userName = '';
  userRole = '';
  isAdmin = false;
  isLibrarian = false;
  isMember = false;

  bookForm: Book = {
    title: '', author: '', isbn: '',
    category: '', publisher: '', totalCopies: 1
  };
  editingId: number | null = null;

  constructor(
    private bookService: BookService,
    private borrowService: BorrowService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.authService.getName() || '';
    this.userRole = this.authService.getRole() || '';
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.isMember = this.authService.isMember();
    this.loadBooks();
  }

  loadBooks() {
    this.searchTerm = '';
    this.bookService.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: () => this.errorMsg = 'Failed to load books'
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.bookService.searchBooks(this.searchTerm).subscribe({
        next: (data) => this.books = data
      });
    } else {
      this.loadBooks();
    }
  }

  openAddModal() {
    this.isEditing = false;
    this.bookForm = {
      title: '', author: '', isbn: '',
      category: '', publisher: '', totalCopies: 1
    };
    this.showModal();
  }

  openEditModal(book: Book) {
    this.isEditing = true;
    this.editingId = book.id!;
    this.bookForm = { ...book };
    this.showModal();
  }

  saveBook() {
    if (this.isEditing && this.editingId) {
      this.bookService.updateBook(this.editingId, this.bookForm).subscribe({
        next: () => {
          this.successMsg = 'Book updated!';
          this.hideModal();
          this.loadBooks();
          setTimeout(() => this.successMsg = '', 3000);
        },
        error: () => this.errorMsg = 'Update failed'
      });
    } else {
      this.bookService.addBook(this.bookForm).subscribe({
        next: () => {
          this.successMsg = 'Book added!';
          this.hideModal();
          this.loadBooks();
          setTimeout(() => this.successMsg = '', 3000);
        },
        error: () => this.errorMsg = 'Add failed'
      });
    }
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.successMsg = 'Book deleted!';
          this.loadBooks();
          setTimeout(() => this.successMsg = '', 3000);
        },
        error: () => this.errorMsg = 'Delete failed'
      });
    }
  }

  borrowBook(bookId: number) {
    this.borrowService.requestBorrow(bookId).subscribe({
      next: () => {
        this.successMsg = 'Borrow request sent! Waiting for approval.';
        this.loadBooks();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => this.errorMsg = 'Borrow request failed'
    });
  }

  showModal() {
    const modal = new bootstrap.Modal(document.getElementById('bookModal'));
    modal.show();
  }

  hideModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
    if (modal) modal.hide();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}