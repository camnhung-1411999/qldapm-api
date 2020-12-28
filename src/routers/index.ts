import userRoute from './user.routes';
import fileRoute from './file.routes';
import transactionRoute from './transaction.routes';
import paymentRoute from './payment.routes';

import express = require('express');
const router = express.Router();

router.use('/users', userRoute);
router.use('/files', fileRoute);
router.use('/transactions', transactionRoute);
router.use('/payments', paymentRoute);

export default router;
