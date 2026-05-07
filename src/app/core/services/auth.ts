// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LoginRequest, LoginResponse, Member } from '../../models/member.model';

// @Injectable({ providedIn: 'root' })
// export class AuthService {

//   private apiUrl = 'http://localhost:8081/api/auth';

//   constructor(private http: HttpClient) {}

//   login(credentials: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
//   }

//   register(member: Member): Observable<Member> {
//     return this.http.post<Member>(`${this.apiUrl}/register`, member);
//   }

//   saveToken(token: string, role: string, name: string): void {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     localStorage.setItem('name', name);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getRole(): string | null {
//     return localStorage.getItem('role');
//   }

//   getName(): string | null {
//     return localStorage.getItem('name');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   isAdmin(): boolean {
//     return this.getRole() === 'ADMIN';
//   }

//   isLibrarian(): boolean {
//     return this.getRole() === 'LIBRARIAN';
//   }

//   isMember(): boolean {
//     return this.getRole() === 'MEMBER';
//   }

//   logout(): void {
//     localStorage.clear();
//   }
// }

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  LoginRequest,
  LoginResponse,
  Member
} from '../../models/member.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl =
    'http://localhost:8081/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(
    credentials: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  register(
    member: Member
  ): Observable<Member> {

    return this.http.post<Member>(
      `${this.apiUrl}/register`,
      member
    );
  }

  saveToken(
    token: string,
    role: string,
    name: string
  ): void {

    localStorage.setItem('token', token);

    localStorage.setItem('role', role);

    localStorage.setItem('name', name);
  }

  getToken(): string | null {

    return localStorage.getItem('token');
  }

  getRole(): string | null {

    return localStorage.getItem('role');
  }

  getName(): string | null {

    return localStorage.getItem('name');
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {

    return this.getRole() === 'ADMIN';
  }

  isLibrarian(): boolean {

    return this.getRole() === 'LIBRARIAN';
  }

  isMember(): boolean {

    return this.getRole() === 'MEMBER';
  }

  logout(): void {

    localStorage.clear();
  }

}