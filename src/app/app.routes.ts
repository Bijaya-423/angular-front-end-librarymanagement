import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./pages/books/book-list/book-list')
        .then(m => m.BookListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'members',
    loadComponent: () =>
      import('./pages/members/member-list/member-list')
        .then(m => m.MemberListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'borrow',
    loadComponent: () =>
      import('./pages/borrow/borrow-list/borrow-list')
        .then(m => m.BorrowListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./pages/borrow/borrow-history/borrow-history')
        .then(m => m.BorrowHistoryComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];