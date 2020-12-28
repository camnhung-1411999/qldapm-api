import express = require('express');
import userController from '../controllers/user.controller';
import { author } from '../middleware/authorization';
import multer from 'multer';
var upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.get(
  '/list',
  author,
  userController.list,
)
router.post(
  '/mail',
  author,
  userController.sendMail,
)

router.get(
  '/',
  author,
  userController.find,
)
router.post(
  '/login',
  userController.detail,
)
router.post(
  '/',
  userController.create,
)
router.put(
  '/',
  author,
  upload.single('file'),
  userController.update,
)
export default router;