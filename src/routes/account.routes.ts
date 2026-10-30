import { Router } from 'express';
import * as accountController from '../controllers/account.controller';
import * as transactionController from '../controllers/transaction.controller';

const router = Router();

router.post('/', accountController.createAccount);
router.post('/:id/transactions', transactionController.createTransaction);

export default router;
