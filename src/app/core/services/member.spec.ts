import { TestBed } from '@angular/core/testing';

import { Member } from './member';

describe('Member', () => {
  let service: Member;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Member);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
