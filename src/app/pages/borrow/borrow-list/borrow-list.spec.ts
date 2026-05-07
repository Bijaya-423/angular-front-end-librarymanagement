import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowList } from './borrow-list';

describe('BorrowList', () => {
  let component: BorrowList;
  let fixture: ComponentFixture<BorrowList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowList],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
