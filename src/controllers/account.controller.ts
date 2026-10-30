import { NextFunction, Request, Response } from 'express';
import * as accountService from '../services/account.service';
import { accountIdSchema, createAccountSchema } from '../validators/account.validator';
import { parse } from '../validators/validate';

export async function createAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = parse(createAccountSchema, req.body);
    const account = await accountService.createAccount(name);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
}

export async function getBalance(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parse(accountIdSchema, req.params.id);
    res.json(await accountService.getBalance(id));
  } catch (err) {
    next(err);
  }
}
