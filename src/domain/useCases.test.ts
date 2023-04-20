import { makeAddBook, makeGetBooks } from "./useCases";
import {
  InMemoryUnitOfWork,
  WithUow,
  createInMemoryUnitOfWork,
  createWithInMemoryUnitOfWork,
} from "../adapters/secondary/unitOfWork";

const expectToEqual = <T>(actual: T, expected: T) =>
  expect(actual).toEqual(expected);

describe("Use cases tests", () => {
  let uow: InMemoryUnitOfWork;
  let withUow: WithUow;

  beforeEach(() => {
    uow = createInMemoryUnitOfWork();
    withUow = createWithInMemoryUnitOfWork(uow);
  });

  it("add a book", () => {
    const addBook = makeAddBook(withUow);
    const book = { title: "foo", author: "bar", numberOfPages: 42 };
    addBook(book);
    expectToEqual(uow.bookRepository.books, [book]);
  });

  it("gets all books", async () => {
    const book = { title: "book to get", author: "bar", numberOfPages: 42 };
    uow.bookRepository.setBooks([book]);
    const getBooks = makeGetBooks(withUow);
    expectToEqual(await getBooks(), [book]);
  });
});
