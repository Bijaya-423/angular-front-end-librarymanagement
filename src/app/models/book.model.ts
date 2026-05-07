export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  totalCopies: number;
  availableCopies?: number;
}