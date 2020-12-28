import express = require('express');
import fileController from '../controllers/file.controller';
import { author } from '../middleware/authorization';
import multer from 'multer';
var upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.get(
  '/',
  fileController.list,
)
router.get(
  '/:id',
  author,
  fileController.find,
)
router.post(
  '/',
  author,
  upload.single('file'),
  fileController.create,
)
router.put(
  '/:id',
  author,
  fileController.update,
)
router.delete(
    '/:id',
    author,
    fileController.delete,
)
export default router;