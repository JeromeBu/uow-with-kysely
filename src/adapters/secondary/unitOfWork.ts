import { BookRepository } from "../../domain/useCases";
import { Db, DbTransaction } from "./Database";
import { createInMemoryBookRepository } from "./inMemoryBookRepository";
import { createPgBookRepository } from "./pgBookRepository";

export type UnitOfWork = {
  bookRepository: BookRepository;
};

export type WithUow = <T>(cb: (uow: UnitOfWork) => Promise<T>) => Promise<T>;

const createPgUnitOfWork = (trx: DbTransaction) =>
  ({
    bookRepository: createPgBookRepository(trx),
  } satisfies UnitOfWork);

export type InMemoryUnitOfWork = ReturnType<typeof createInMemoryUnitOfWork>;
export const createInMemoryUnitOfWork = () =>
  ({
    bookRepository: createInMemoryBookRepository(),
  } satisfies UnitOfWork);

export const createWithInMemoryUnitOfWork =
  (uow: InMemoryUnitOfWork = createInMemoryUnitOfWork()): WithUow =>
  (cb) =>
    cb(uow);

export const createWithPgUnitOfWork =
  (db: Db): WithUow =>
  async (cb) =>
    db.transaction().execute((trx) => {
      const uow = createPgUnitOfWork(trx);
      return cb(uow);
    });
