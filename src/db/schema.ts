export interface UserTable {
  id: number;
  username: string;
  password: string;
}

export interface QuoteTable {
  id: number;
  user_id: number;
  movie: string;
  quote: string;
}

export interface DB {
  users: UserTable;
  quotes: QuoteTable;
}
