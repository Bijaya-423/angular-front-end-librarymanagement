import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SidebarComponent }
from '../../../shared/sidebar/sidebar';

import { BorrowService }
from '../../../core/services/borrow';

import { Borrow }
from '../../../models/borrow.model';

@Component({
  selector: 'app-borrow-list',

  standalone: true,

  imports: [
    CommonModule,
    SidebarComponent
  ],

  templateUrl: './borrow-list.html',

  styleUrl: './borrow-list.css'
})

export class BorrowListComponent
implements OnInit {

  borrows: Borrow[] = [];

  constructor(
    private borrowService: BorrowService
  ) {}

  ngOnInit(): void {

    this.loadBorrows();
  }

  loadBorrows(): void {

    this.borrowService
      .getAllBorrows()
      .subscribe({

        next: (res) => {

          this.borrows = res;
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

}