// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   imports: [],
//   templateUrl: './sidebar.html',
//   styleUrl: './sidebar.css',
// })
// export class Sidebar {}


import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService }
from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './sidebar.html',

  styleUrl: './sidebar.css'
})

export class SidebarComponent
implements OnInit {

  userName = '';

  userRole = '';

  isAdmin = false;

  isLibrarian = false;

  isMember = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.userName =
      this.authService.getName() || '';

    this.userRole =
      this.authService.getRole() || '';

    this.isAdmin =
      this.authService.isAdmin();

    this.isLibrarian =
      this.authService.isLibrarian();

    this.isMember =
      this.authService.isMember();
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }

}
