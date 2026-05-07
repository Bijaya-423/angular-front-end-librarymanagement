export interface Member {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  role: 'ADMIN' | 'LIBRARIAN' | 'MEMBER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  name: string;
}