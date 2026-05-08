// import { Routes }
// from '@angular/router';

// import { authGuard }
// from './core/guards/auth-guard';

// export const routes: Routes = [

//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },

//   {
//     path: 'login',

//     loadComponent: () =>
//       import('./pages/login/login')
//       .then(m => m.LoginComponent)
//   },

//   {
//     path: 'register',

//     loadComponent: () =>
//       import('./pages/register/register')
//       .then(m => m.RegisterComponent)
//   },

//   // ADMIN

//   {
//     path: 'dashboard/admin',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/dashboard/dashboard')
//       .then(m => m.DashboardComponent)
//   },

//   {
//     path: 'admin/books',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/books/book-list/book-list')
//       .then(m => m.BookListComponent)
//   },

//   {
//     path: 'admin/members',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/members/member-list/member-list')
//       .then(m => m.MemberListComponent)
//   },

//   {
//     path: 'admin/borrow-records',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/borrow/borrow-list/borrow-list')
//       .then(m => m.BorrowListComponent)
//   },

//   // LIBRARIAN

//   {
//     path: 'dashboard/librarian',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/dashboard/dashboard')
//       .then(m => m.DashboardComponent)
//   },

//   {
//     path: 'librarian/books',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/books/book-list/book-list')
//       .then(m => m.BookListComponent)
//   },

//   {
//     path: 'librarian/members',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/members/member-list/member-list')
//       .then(m => m.MemberListComponent)
//   },

//   {
//     path: 'librarian/borrow-requests',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/borrow/borrow-list/borrow-list')
//       .then(m => m.BorrowListComponent)
//   },

//   // MEMBER

//   {
//     path: 'dashboard/member',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/dashboard/dashboard')
//       .then(m => m.DashboardComponent)
//   },

//   {
//     path: 'member/books',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/books/book-list/book-list')
//       .then(m => m.BookListComponent)
//   },

//   {
//     path: 'member/history',

//     canActivate: [authGuard],

//     loadComponent: () =>
//       import('./pages/borrow/borrow-history/borrow-history')
//       .then(m => m.BorrowHistoryComponent)
//   },

//   {
//     path: '**',
//     redirectTo: 'login'
//   }

// ];
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // Public routes — NO layout
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.RegisterComponent)
  },

  // Protected routes — WITH layout (sidebar stays fixed)
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layout').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      // Dashboard routes
      {
        path: 'dashboard/admin',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard/librarian',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard/member',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      // Books
      {
        path: 'books',
        loadComponent: () =>
          import('./pages/books/book-list/book-list').then(m => m.BookListComponent)
      },
      // Members
      {
        path: 'members',
        loadComponent: () =>
          import('./pages/members/member-list/member-list').then(m => m.MemberListComponent)
      },
      // Borrow
      {
        path: 'borrow/list',
        loadComponent: () =>
          import('./pages/borrow/borrow-list/borrow-list').then(m => m.BorrowListComponent)
      },
      {
        path: 'borrow/history',
        loadComponent: () =>
          import('./pages/borrow/borrow-history/borrow-history').then(m => m.BorrowHistoryComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
