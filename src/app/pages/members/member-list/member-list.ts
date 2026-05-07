import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SidebarComponent }
from '../../../shared/sidebar/sidebar';

import { MemberService }
from '../../../core/services/member';

import { Member }
from '../../../models/member.model';

@Component({
  selector: 'app-member-list',

  standalone: true,

  imports: [
    CommonModule,
    SidebarComponent
  ],

  templateUrl: './member-list.html',

  styleUrl: './member-list.css'
})

export class MemberListComponent
implements OnInit {

  members: Member[] = [];

  constructor(
    private memberService: MemberService
  ) {}

  ngOnInit(): void {

    this.loadMembers();
  }

  loadMembers(): void {

    this.memberService
      .getAllMembers()
      .subscribe({

        next: (res) => {

          this.members = res;
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

}