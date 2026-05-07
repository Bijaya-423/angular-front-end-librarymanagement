import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SidebarComponent }
from '../../../shared/sidebar/sidebar';

import { BookService }
from '../../../core/services/book';

import { Book }
from '../../../models/book.model';

@Component({
  selector: 'app-book-list',

  standalone: true,

  imports: [
    CommonModule,
    SidebarComponent
  ],

  templateUrl: './book-list.html',

  styleUrl: './book-list.css'
})

export class BookListComponent
implements OnInit {

  books: Book[] = [];

  constructor(
    private bookService: BookService
  ) {}

  ngOnInit(): void {

    this.loadBooks();
  }

  loadBooks(): void {

    this.bookService
      .getAllBooks()
      .subscribe({

        next: (res) => {

          this.books = res;
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

}
