// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { BookService } from '../../../core/services/book';
// import { BorrowService } from '../../../core/services/borrow';
// import { AuthService } from '../../../core/services/auth';
// import { Book } from '../../../models/book.model';

// declare var bootstrap: any;

// @Component({
//   selector: 'app-book-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './book-list.html',
//   styleUrl: './book-list.css'
// })
// export class BookListComponent implements OnInit {

//   books: Book[] = [];
//   searchTerm = '';
//   categoryFilter = '';        // ← added
//   successMsg = '';
//   errorMsg = '';
//   isEditing = false;
//   isAdmin = false;
//   isLibrarian = false;
//   isMember = false;
//   editingId: number | null = null;

//   bookForm: Book = {
//     title: '', author: '', isbn: '',
//     category: '', publisher: '', totalCopies: 1
//   };

//   constructor(
//     private bookService: BookService,
//     private borrowService: BorrowService,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     this.isAdmin = this.authService.isAdmin();
//     this.isLibrarian = this.authService.isLibrarian();
//     this.isMember = this.authService.isMember();
//     this.loadBooks();
//   }

//   loadBooks() {
//     this.searchTerm = '';
//     this.categoryFilter = '';
//     this.bookService.getAllBooks().subscribe({
//       next: (data) => this.books = data,
//       error: () => this.showError('Failed to load books')
//     });
//   }

//   onSearch() {
//     if (this.searchTerm.trim()) {
//       this.bookService.searchBooks(this.searchTerm).subscribe({
//         next: (data) => this.books = data,
//         error: () => this.showError('Search failed')
//       });
//     } else {
//       this.loadBooks();
//     }
//   }

//   onCategoryFilter() {          // ← added
//     if (this.categoryFilter.trim()) {
//       this.bookService.getBooksByCategory(
//         this.categoryFilter).subscribe({
//         next: (data) => this.books = data,
//         error: () => this.showError('Filter failed')
//       });
//     } else {
//       this.loadBooks();
//     }
//   }

//   viewBook(id: number) {        // ← added
//     this.bookService.getBookById(id).subscribe({
//       next: (book) => alert(
//         `Title: ${book.title}\nAuthor: ${book.author}\nISBN: ${book.isbn}\nCategory: ${book.category}\nPublisher: ${book.publisher}\nTotal Copies: ${book.totalCopies}\nAvailable: ${book.availableCopies}`
//       ),
//       error: () => this.showError('Failed to load book')
//     });
//   }

//   openAddModal() {
//     this.isEditing = false;
//     this.bookForm = {
//       title: '', author: '', isbn: '',
//       category: '', publisher: '', totalCopies: 1
//     };
//     this.showModal();
//   }

//   openEditModal(book: Book) {
//     this.isEditing = true;
//     this.editingId = book.id!;
//     this.bookForm = { ...book };
//     this.showModal();
//   }

//   saveBook() {
//     if (this.isEditing && this.editingId) {
//       this.bookService.updateBook(
//         this.editingId, this.bookForm).subscribe({
//         next: () => {
//           this.showSuccess('Book updated!');
//           this.hideModal();
//           this.loadBooks();
//         },
//         error: () => this.showError('Update failed')
//       });
//     } else {
//       this.bookService.addBook(this.bookForm).subscribe({
//         next: () => {
//           this.showSuccess('Book added!');
//           this.hideModal();
//           this.loadBooks();
//         },
//         error: (err) => this.showError(
//           err.error?.error || 'Add failed')
//       });
//     }
//   }

//   deleteBook(id: number) {
//     if (confirm('Delete this book?')) {
//       this.bookService.deleteBook(id).subscribe({
//         next: () => {
//           this.showSuccess('Book deleted!');
//           this.loadBooks();
//         },
//         error: () => this.showError('Delete failed')
//       });
//     }
//   }

//   borrowBook(bookId: number) {
//     this.borrowService.requestBorrow(bookId).subscribe({
//       next: () => this.showSuccess(
//         'Borrow request sent! Waiting for approval.'),
//       error: (err) => this.showError(
//         err.error?.error || 'Borrow failed')
//     });
//   }

//   showModal() {
//     const modal = new bootstrap.Modal(
//       document.getElementById('bookModal'));
//     modal.show();
//   }

//   hideModal() {
//     const modal = bootstrap.Modal.getInstance(
//       document.getElementById('bookModal'));
//     if (modal) modal.hide();
//   }

//   showSuccess(msg: string) {
//     this.successMsg = msg;
//     this.errorMsg = '';
//     setTimeout(() => this.successMsg = '', 4000);
//   }

//   showError(msg: string) {
//     this.errorMsg = msg;
//     this.successMsg = '';
//     setTimeout(() => this.errorMsg = '', 4000);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  categoryFilter = '';
  successMsg = '';
  errorMsg = '';
  isEditing = false;
  isAdmin = false;
  isLibrarian = false;
  isMember = false;
  editingId: number | null = null;
  loading = false;

  bookForm: Book = {
    title: '', author: '', isbn: '',
    category: '', publisher: '', totalCopies: 1
  };

  constructor(
    private bookService: BookService,
    private borrowService: BorrowService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.isMember = this.authService.isMember();
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.searchTerm = '';
    this.categoryFilter = '';
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Load books error:', err);
        this.showError('Failed to load books. Check if backend is running.');
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.bookService.searchBooks(this.searchTerm).subscribe({
        next: (data) => this.books = data,
        error: () => this.showError('Search failed')
      });
    } else {
      this.loadBooks();
    }
  }

  onCategoryFilter() {
    if (this.categoryFilter.trim()) {
      this.bookService.getBooksByCategory(
        this.categoryFilter).subscribe({
        next: (data) => this.books = data,
        error: () => this.showError('Filter failed')
      });
    } else {
      this.loadBooks();
    }
  }

  viewBook(id: number) {
    this.bookService.getBookById(id).subscribe({
      next: (book) => alert(
        `📖 Book Details\n\nTitle: ${book.title}\nAuthor: ${book.author}\nISBN: ${book.isbn}\nCategory: ${book.category}\nPublisher: ${book.publisher}\nTotal Copies: ${book.totalCopies}\nAvailable: ${book.availableCopies}`
      ),
      error: () => this.showError('Failed to load book details')
    });
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
      this.bookService.updateBook(
        this.editingId, this.bookForm).subscribe({
        next: () => {
          this.showSuccess('✅ Book updated successfully!');
          this.hideModal();
          this.loadBooks();
        },
        error: (err) => this.showError(
          err.error?.error || 'Update failed')
      });
    } else {
      this.bookService.addBook(this.bookForm).subscribe({
        next: () => {
          this.showSuccess('✅ Book added successfully!');
          this.hideModal();
          this.loadBooks();
        },
        error: (err) => this.showError(
          err.error?.error || 'Failed to add book')
      });
    }
  }

  deleteBook(id: number) {
    if (confirm('⚠️ Delete this book permanently?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.showSuccess('✅ Book deleted!');
          this.loadBooks();
        },
        error: () => this.showError('Delete failed')
      });
    }
  }

  // ✅ FIXED borrow method
  borrowBook(bookId: number) {
    console.log('Borrowing book ID:', bookId);
    this.borrowService.requestBorrow(bookId).subscribe({
      next: (res) => {
        console.log('Borrow response:', res);
        this.showSuccess(
          '✅ Borrow request sent! Waiting for librarian approval.');
        this.loadBooks();
      },
      error: (err) => {
        console.error('Borrow error:', err);
        this.showError(err.error?.error || 'Borrow request failed');
      }
    });
  }

  showModal() {
    const el = document.getElementById('bookModal');
    if (el) {
      const modal = new bootstrap.Modal(el);
      modal.show();
    }
  }

  hideModal() {
    const el = document.getElementById('bookModal');
    if (el) {
      const modal = bootstrap.Modal.getInstance(el);
      if (modal) modal.hide();
    }
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    this.errorMsg = '';
    setTimeout(() => this.successMsg = '', 5000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    this.successMsg = '';
    setTimeout(() => this.errorMsg = '', 5000);
  }
}