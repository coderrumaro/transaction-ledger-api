export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(400, 'VALIDATION_ERROR', message, details);

export const accountNotFound = (id: string) =>
  new AppError(404, 'ACCOUNT_NOT_FOUND', `Account ${id} not found`);

export const insufficientBalance = () =>
  new AppError(422, 'INSUFFICIENT_BALANCE', 'Account does not have enough balance');

export const duplicateTransaction = (existing: unknown) =>
  new AppError(409, 'DUPLICATE_TRANSACTION', 'Transaction with this reference_id already exists', {
    transaction: existing,
  });
