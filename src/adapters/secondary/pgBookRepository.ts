import { Book, BookRepository } from "../../domain/useCases";
import { PgBook, DbTransaction } from "./Database";

export const createPgBookRepository = (trx: DbTransaction): BookRepository => ({
  addBook: async (book) => {
    const pgBook = bookToBookTable(book);
    await trx.insertInto("books").values(pgBook).execute();
  },
  getBooks: () =>
    trx
      .selectFrom("books")
      .select(["author", "title", "number_of_pages as numberOfPages"])
      .execute(),
});

const bookToBookTable = (book: Book): PgBook => ({
  author: book.author,
  title: book.author,
  number_of_pages: book.numberOfPages,
});
