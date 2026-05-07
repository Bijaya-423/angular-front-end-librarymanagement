import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SidebarComponent }
from '../../../shared/sidebar/sidebar';

import { BorrowService }
from '../../../core/services/borrow';

import { Borrow }
from '../../../models/borrow.model';

@Component({
  selector: 'app-borrow-history',

  standalone: true,

  imports: [
    CommonModule,
    SidebarComponent
  ],

  templateUrl: './borrow-history.html',

  styleUrl: './borrow-history.css'
})

export class BorrowHistoryComponent
implements OnInit {

  borrows: Borrow[] = [];

  constructor(
    private borrowService: BorrowService
  ) {}

  ngOnInit(): void {

    this.loadHistory();
  }

  loadHistory(): void {

    this.borrowService
      .getMyHistory()
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