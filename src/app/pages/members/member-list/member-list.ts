import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MemberService } from '../../../core/services/member';
import { AuthService } from '../../../core/services/auth';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];
  successMsg = '';
  errorMsg = '';
  userName = '';
  userRole = '';
  isAdmin = false;
  isLibrarian = false;

  constructor(
    private memberService: MemberService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.authService.getName() || '';
    this.userRole = this.authService.getRole() || '';
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getAllMembers().subscribe({
      next: (data) => this.members = data,
      error: () => this.errorMsg = 'Failed to load members'
    });
  }

  deleteMember(id: number) {
    if (confirm('Delete this member?')) {
      this.memberService.deleteMember(id).subscribe({
        next: () => {
          this.successMsg = 'Member deleted!';
          this.loadMembers();
          setTimeout(() => this.successMsg = '', 3000);
        },
        error: () => this.errorMsg = 'Delete failed'
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}