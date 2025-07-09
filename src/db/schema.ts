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

// Here DB is our whole database schema/structure. It's a map that connects table names (users, quotes) to the shape of each table (UserTable, QuoteTable)
// We have passed this 'DB' into Kysely in 'client.ts' (look there) which makes 'db' fully typed and safe.
export interface DB {
  users: UserTable;
  quotes: QuoteTable;
}

// We use interface for defining the schema because Kysely supports (and expects) interface-based schema definitions.
