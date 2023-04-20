import { Book, BookRepository } from "../../domain/useCases";

export type InMemoryBookRepository = ReturnType<
  typeof createInMemoryBookRepository
>;
export const createInMemoryBookRepository = () => {
  let books: Book[] = [];

  const repository = {
    addBook: async (book) => {
      books.push(book);
    },
    getBooks: async () => books,
  } satisfies BookRepository;

  return {
    ...repository,
    books,
    setBooks: (newBooks: Book[]) => {
      books = newBooks;
    },
  };
};
