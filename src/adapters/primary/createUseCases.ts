import { makeAddBook, makeGetBooks } from "../../domain/useCases";
import {
  createWithInMemoryUnitOfWork,
  createWithPgUnitOfWork,
} from "../secondary/unitOfWork";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Database } from "../secondary/Database";

export const createUseCases = () => {
  const withUow = getWithUow();

  return {
    addBook: makeAddBook(withUow),
    getBooks: makeGetBooks(withUow),
  };
};

const getWithUow = () => {
  console.log("REPOSITORY_MODE : ", process.env.REPOSITORY_MODE);

  if (process.env.REPOSITORY_MODE === "PG") {
    const db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({ connectionString: process.env.DATABASE_URL }),
      }),
    });
    return createWithPgUnitOfWork(db);
  }

  if (process.env.REPOSITORY_MODE === "IN_MEMORY")
    return createWithInMemoryUnitOfWork();

  throw new Error("Not implemented");
};
