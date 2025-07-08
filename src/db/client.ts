// This is the MySQL database connection setup using Kysely (a TypeScript SQL query builder). This file client.ts enables database functionality

import { createPool } from "mysql2/promise";
import { Kysely, MysqlDialect } from "kysely";
import type { DB } from "./schema";
import dotenv from "dotenv";

dotenv.config();

const dialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }),
});

export const db = new Kysely<DB>({ dialect });
