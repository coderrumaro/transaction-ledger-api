import { Router } from 'express';
import * as accountController from '../controllers/account.controller';

const router = Router();

router.post('/', accountController.createAccount);

export default router;
