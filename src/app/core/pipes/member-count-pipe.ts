import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../../models/member.model';

@Pipe({
  name: 'memberCount',
  standalone: true
})
export class MemberCountPipe implements PipeTransform {
  transform(members: Member[], role: string): number {
    if (!members) return 0;
    return members.filter(m => m.role === role).length;
  }
}