export interface Borrow {
  id?: number;
  bookId: number;
  bookTitle?: string;
  memberId?: number;
  memberName?: string;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'BORROWED' | 'RETURNED' | 'OVERDUE';
}
