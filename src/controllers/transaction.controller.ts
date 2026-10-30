import { NextFunction, Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';
import { accountIdSchema } from '../validators/account.validator';
import {
  createTransactionSchema,
  listTransactionsSchema,
} from '../validators/transaction.validator';
import { parse } from '../validators/validate';

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const accountId = parse(accountIdSchema, req.params.id);
    const input = parse(createTransactionSchema, req.body);
    const transaction = await transactionService.createTransaction(accountId, input);
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
}

export async function listTransactions(req: Request, res: Response, next: NextFunction) {
  try {
    const accountId = parse(accountIdSchema, req.params.id);
    const query = parse(listTransactionsSchema, req.query);
    const result = await transactionService.listTransactions(accountId, query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
