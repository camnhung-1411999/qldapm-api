import express = require('express');
import transactionController from '../controllers/transaction.controller';
import { author } from '../middleware/authorization';
const router = express.Router();

router.get(
  '/',
  transactionController.list,
)
router.get(
  '/:id',
  transactionController.find,
)
router.post(
  '/',
  author,
  transactionController.create,
)
router.put(
  '/:id',
  author,
  transactionController.update,
)
router.delete(
    '/:id',
    author,
    transactionController.delete,
)
export default router;