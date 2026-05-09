// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MemberService } from '../../../core/services/member';
// import { AuthService } from '../../../core/services/auth';
// import { Member } from '../../../models/member.model';

// declare var bootstrap: any;

// @Component({
//   selector: 'app-member-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule], // ← pipe removed
//   templateUrl: './member-list.html',
//   styleUrl: './member-list.css'
// })
// export class MemberListComponent implements OnInit {

//   members: Member[] = [];
//   successMsg = '';
//   errorMsg = '';
//   isAdmin = false;
//   isLibrarian = false;
//   selectedMember: Member | null = null;

//   // ← count properties directly
//   adminCount = 0;
//   librarianCount = 0;
//   memberCount = 0;

//   editForm: Member = {
//     name: '', email: '',
//     phone: '', address: '', role: 'MEMBER'
//   };

//   constructor(
//     private memberService: MemberService,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     this.isAdmin = this.authService.isAdmin();
//     this.isLibrarian = this.authService.isLibrarian();
//     this.loadMembers();
//   }

//   loadMembers() {
//     this.memberService.getAllMembers().subscribe({
//       next: (data) => {
//         this.members = data;
//         // calculate counts here directly
//         this.adminCount = data.filter(
//           m => m.role === 'ADMIN').length;
//         this.librarianCount = data.filter(
//           m => m.role === 'LIBRARIAN').length;
//         this.memberCount = data.filter(
//           m => m.role === 'MEMBER').length;
//       },
//       error: () => this.showError('Failed to load members')
//     });
//   }

//   viewMember(id: number) {
//     this.memberService.getMemberById(id).subscribe({
//       next: (member) => {
//         this.selectedMember = member;
//         const modal = new bootstrap.Modal(
//           document.getElementById('viewModal'));
//         modal.show();
//       },
//       error: () => this.showError('Failed to load member')
//     });
//   }

//   openEditModal(member: Member) {
//     this.editForm = { ...member };
//     const modal = new bootstrap.Modal(
//       document.getElementById('editModal'));
//     modal.show();
//   }

//   updateMember() {
//     if (!this.editForm.id) return;
//     this.memberService.updateMember(
//       this.editForm.id, this.editForm).subscribe({
//       next: () => {
//         this.showSuccess('Member updated!');
//         this.loadMembers();
//         const modal = bootstrap.Modal.getInstance(
//           document.getElementById('editModal'));
//         if (modal) modal.hide();
//       },
//       error: () => this.showError('Update failed')
//     });
//   }

//   deleteMember(id: number) {
//     if (confirm('Delete this member?')) {
//       this.memberService.deleteMember(id).subscribe({
//         next: () => {
//           this.showSuccess('Member deleted!');
//           this.loadMembers();
//         },
//         error: () => this.showError('Delete failed')
//       });
//     }
//   }

//   showSuccess(msg: string) {
//     this.successMsg = msg;
//     this.errorMsg = '';
//     setTimeout(() => this.successMsg = '', 4000);
//   }

//   showError(msg: string) {
//     this.errorMsg = msg;
//     this.successMsg = '';
//     setTimeout(() => this.errorMsg = '', 4000);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../../core/services/member';
import { AuthService } from '../../../core/services/auth';
import { Member } from '../../../models/member.model';

declare var bootstrap: any;

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];
  successMsg = '';
  errorMsg = '';
  isAdmin = false;
  isLibrarian = false;
  selectedMember: Member | null = null;
  loading = false;
  adminCount = 0;
  librarianCount = 0;
  memberCount = 0;

  editForm: Member = {
    name: '', email: '',
    phone: '', address: '', role: 'MEMBER'
  };

  constructor(
    private memberService: MemberService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isLibrarian = this.authService.isLibrarian();
    this.loadMembers();
  }

  loadMembers() {
    this.loading = true;
    this.memberService.getAllMembers().subscribe({
      next: (data) => {
        console.log('Members loaded:', data);
        this.members = data;
        this.adminCount = data.filter(
          m => m.role === 'ADMIN').length;
        this.librarianCount = data.filter(
          m => m.role === 'LIBRARIAN').length;
        this.memberCount = data.filter(
          m => m.role === 'MEMBER').length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Members error:', err);
        this.showError('Failed to load members');
        this.loading = false;
      }
    });
  }

  viewMember(id: number) {
    this.memberService.getMemberById(id).subscribe({
      next: (member) => {
        this.selectedMember = member;
        const modal = new bootstrap.Modal(
          document.getElementById('viewModal'));
        modal.show();
      },
      error: () => this.showError('Failed to load member details')
    });
  }

  openEditModal(member: Member) {
    this.editForm = { ...member };
    const modal = new bootstrap.Modal(
      document.getElementById('editModal'));
    modal.show();
  }

  updateMember() {
    if (!this.editForm.id) return;
    this.memberService.updateMember(
      this.editForm.id, this.editForm).subscribe({
      next: () => {
        this.showSuccess('✅ Member updated!');
        this.loadMembers();
        const modal = bootstrap.Modal.getInstance(
          document.getElementById('editModal'));
        if (modal) modal.hide();
      },
      error: () => this.showError('Update failed')
    });
  }

  deleteMember(id: number) {
    if (confirm('⚠️ Delete this member permanently?')) {
      this.memberService.deleteMember(id).subscribe({
        next: () => {
          this.showSuccess('✅ Member deleted!');
          this.loadMembers();
        },
        error: () => this.showError('Delete failed')
      });
    }
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    this.errorMsg = '';
    setTimeout(() => this.successMsg = '', 5000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    this.successMsg = '';
    setTimeout(() => this.errorMsg = '', 5000);
  }
}
