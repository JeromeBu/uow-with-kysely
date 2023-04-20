import { UnitOfWork, WithUow } from "./adapters/secondary/unitOfWork";

// prettier-ignore
type UseCaseCallback<Params, Output, Gateways> =
  (deps: {gateways: Gateways, uow: UnitOfWork}, params: Params) => Promise<Output>

export type CreateUseCase = <Params, Output = void, Gateways = void>(
  callback: UseCaseCallback<Params, Output, Gateways>
) => (
  withUow: WithUow,
  gateways: Gateways
) => (params: Params) => Promise<Output>;

// prettier-ignore
export const createUseCase: CreateUseCase = (cb) => 
  (withUow, gateways) => async (params) => withUow(uow => cb({ gateways, uow }, params))
