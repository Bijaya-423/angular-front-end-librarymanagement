// import { Routes } from '@angular/router';

// import { authGuard } from './core/guards/auth-guard';

// export const routes: Routes = [

//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },

//   // LOGIN

//   {
//     path: 'login',
//     loadComponent: () =>
//       import('./pages/login/login')
//         .then(m => m.LoginComponent)
//   },

//   // REGISTER

//   {
//     path: 'register',
//     loadComponent: () =>
//       import('./pages/register/register')
//         .then(m => m.RegisterComponent)
//   },

//   // ================= ADMIN =================

//   {
//     path: 'dashboard/admin',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/dashboard/dashboard')
//         .then(m => m.DashboardComponent)
//   },

//   {
//     path: 'admin/books',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/books/book-list/book-list')
//         .then(m => m.BookListComponent)
//   },

//   {
//     path: 'admin/members',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/members/member-list/member-list')
//         .then(m => m.MemberListComponent)
//   },

//   {
//     path: 'admin/borrow-records',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/borrow/borrow-list/borrow-list')
//         .then(m => m.BorrowListComponent)
//   },

//   // ================= LIBRARIAN =================

//   {
//     path: 'dashboard/librarian',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/dashboard/dashboard')
//         .then(m => m.DashboardComponent)
//   },

//   {
//     path: 'librarian/books',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/books/book-list/book-list')
//         .then(m => m.BookListComponent)
//   },

//   {
//     path: 'librarian/members',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/members/member-list/member-list')
//         .then(m => m.MemberListComponent)
//   },

//   {
//     path: 'librarian/borrow-requests',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/borrow/borrow-list/borrow-list')
//         .then(m => m.BorrowListComponent)
//   },

//   // ================= MEMBER =================

//   {
//     path: 'dashboard/member',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/dashboard/dashboard')
//         .then(m => m.DashboardComponent)
//   },

//   {
//     path: 'member/books',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/books/book-list/book-list')
//         .then(m => m.BookListComponent)
//   },

//   {
//     path: 'member/history',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./pages/borrow/borrow-history/borrow-history')
//         .then(m => m.BorrowHistoryComponent)
//   },

//   // INVALID URL

//   {
//     path: '**',
//     redirectTo: 'login'
//   }

// ];

import { Routes }
from '@angular/router';

import { authGuard }
from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',

    loadComponent: () =>
      import('./pages/login/login')
      .then(m => m.LoginComponent)
  },

  {
    path: 'register',

    loadComponent: () =>
      import('./pages/register/register')
      .then(m => m.RegisterComponent)
  },

  // ADMIN

  {
    path: 'dashboard/admin',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/dashboard/dashboard')
      .then(m => m.DashboardComponent)
  },

  {
    path: 'admin/books',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/books/book-list/book-list')
      .then(m => m.BookListComponent)
  },

  {
    path: 'admin/members',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/members/member-list/member-list')
      .then(m => m.MemberListComponent)
  },

  {
    path: 'admin/borrow-records',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/borrow/borrow-list/borrow-list')
      .then(m => m.BorrowListComponent)
  },

  // LIBRARIAN

  {
    path: 'dashboard/librarian',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/dashboard/dashboard')
      .then(m => m.DashboardComponent)
  },

  {
    path: 'librarian/books',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/books/book-list/book-list')
      .then(m => m.BookListComponent)
  },

  {
    path: 'librarian/members',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/members/member-list/member-list')
      .then(m => m.MemberListComponent)
  },

  {
    path: 'librarian/borrow-requests',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/borrow/borrow-list/borrow-list')
      .then(m => m.BorrowListComponent)
  },

  // MEMBER

  {
    path: 'dashboard/member',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/dashboard/dashboard')
      .then(m => m.DashboardComponent)
  },

  {
    path: 'member/books',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/books/book-list/book-list')
      .then(m => m.BookListComponent)
  },

  {
    path: 'member/history',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/borrow/borrow-history/borrow-history')
      .then(m => m.BorrowHistoryComponent)
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];