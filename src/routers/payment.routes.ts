import express = require('express');
import paymentController from '../controllers/payment.controller';
import { author } from '../middleware/authorization';
const router = express.Router();

router.get(
  '/',
  author,
  paymentController.list,
)
router.get(
  '/:id',
  author,
  paymentController.find,
)
router.post(
  '/',
  author,
  paymentController.create,
)
router.put(
  '/:id',
  author,
  paymentController.update,
)
router.delete(
    '/:id',
    author,
    paymentController.delete,
)
export default router;