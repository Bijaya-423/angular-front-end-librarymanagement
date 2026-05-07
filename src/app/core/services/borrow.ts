import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrow } from '../../models/borrow.model';

@Injectable({ providedIn: 'root' })
export class BorrowService {

  private apiUrl = 'http://localhost:8081/api/borrow';

  constructor(private http: HttpClient) {}

  requestBorrow(bookId: number): Observable<Borrow> {
    return this.http.post<Borrow>(`${this.apiUrl}?bookId=${bookId}`, {});
  }

  returnBook(borrowId: number): Observable<Borrow> {
    return this.http.put<Borrow>(`${this.apiUrl}/return/${borrowId}`, {});
  }

  getMyHistory(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/history`);
  }

  getAllBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.apiUrl}/all`);
  }

  getBorrowById(id: number): Observable<Borrow> {
    return this.http.get<Borrow>(`${this.apiUrl}/${id}`);
  }

  approveBorrow(id: number): Observable<Borrow> {
    return this.http.put<Borrow>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectBorrow(id: number): Observable<Borrow> {
    return this.http.put<Borrow>(`${this.apiUrl}/reject/${id}`, {});
  }
}