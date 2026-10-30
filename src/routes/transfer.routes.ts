import { Router } from 'express';
import * as transactionController from '../controllers/transaction.controller';

const router = Router();

router.post('/', transactionController.transfer);

export default router;
