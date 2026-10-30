import { Router } from 'express';
import * as accountController from '../controllers/account.controller';
import * as transactionController from '../controllers/transaction.controller';

const router = Router();

router.post('/', accountController.createAccount);
router.get('/:id/balance', accountController.getBalance);
router.post('/:id/transactions', transactionController.createTransaction);
router.get('/:id/transactions', transactionController.listTransactions);

export default router;
