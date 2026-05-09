import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../../models/member.model';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private apiUrl = 'http://localhost:8081/api/members';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${id}`, member);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}