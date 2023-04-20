import type { Kysely, Transaction } from "kysely";

export type PgBook = {
  title: string;
  author: string;
  number_of_pages: number;
};

export type Database = {
  books: PgBook;
};

export type DbTransaction = Transaction<Database>;
export type Db = Kysely<Database>;
