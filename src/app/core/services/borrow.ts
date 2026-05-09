// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Borrow } from '../../models/borrow.model';

// @Injectable({ providedIn: 'root' })
// export class BorrowService {

//   private apiUrl = 'http://localhost:8081/api/borrow';

//   constructor(private http: HttpClient) {}

//   requestBorrow(bookId: number): Observable<Borrow> {
//     return this.http.post<Borrow>(`${this.apiUrl}?bookId=${bookId}`, {});
//   }

//   returnBook(borrowId: number): Observable<Borrow> {
//     return this.http.put<Borrow>(`${this.apiUrl}/return/${borrowId}`, {});
//   }

//   getMyHistory(): Observable<Borrow[]> {
//     return this.http.get<Borrow[]>(`${this.apiUrl}/history`);
//   }

//   getAllBorrows(): Observable<Borrow[]> {
//     return this.http.get<Borrow[]>(`${this.apiUrl}/all`);
//   }

//   getBorrowById(id: number): Observable<Borrow> {
//     return this.http.get<Borrow>(`${this.apiUrl}/${id}`);
//   }

//   approveBorrow(id: number): Observable<Borrow> {
//     return this.http.put<Borrow>(`${this.apiUrl}/approve/${id}`, {});
//   }

//   rejectBorrow(id: number): Observable<Borrow> {
//     return this.http.put<Borrow>(`${this.apiUrl}/reject/${id}`, {});
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrow } from '../../models/borrow.model';

@Injectable({ providedIn: 'root' })
export class BorrowService {

  private apiUrl = 'http://localhost:8081/api/borrow';

  constructor(private http: HttpClient) {}

  // POST /api/borrow?bookId=1
  requestBorrow(bookId: number): Observable<Borrow> {
    return this.http.post<Borrow>(
      `${this.apiUrl}?bookId=${bookId}`, null);
  }

  // PUT /api/borrow/return/{borrowId}
  returnBook(borrowId: number): Observable<Borrow> {
    return this.http.put<Borrow>(
      `${this.apiUrl}/return/${borrowId}`, null);
  }

  // GET /api/borrow/history
  getMyHistory(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/history`);
  }

  // GET /api/borrow/all
  getAllBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/all`);
  }

  // GET /api/borrow/{id}
  getBorrowById(id: number): Observable<Borrow> {
    return this.http.get<Borrow>(`${this.apiUrl}/${id}`);
  }

  // PUT /api/borrow/approve/{id}
  approveBorrow(id: number): Observable<Borrow> {
    return this.http.put<Borrow>(
      `${this.apiUrl}/approve/${id}`, null);
  }

  // PUT /api/borrow/reject/{id}
  rejectBorrow(id: number): Observable<Borrow> {
    return this.http.put<Borrow>(
      `${this.apiUrl}/reject/${id}`, null);
  }
}