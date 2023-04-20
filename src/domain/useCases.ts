import { createUseCase } from "../createUseCase";

export type Book = {
  title: string;
  author: string;
  numberOfPages: number;
};

export type BookRepository = {
  addBook: (book: Book) => Promise<void>;
  getBooks: () => Promise<Book[]>;
};

export const makeAddBook = createUseCase<Book>(({ uow }, book) =>
  uow.bookRepository.addBook(book)
);

export const makeGetBooks = createUseCase<void, Book[]>(({ uow }) =>
  uow.bookRepository.getBooks()
);
