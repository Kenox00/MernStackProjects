import express from 'express';
import { GetBooks, GetBook, CreateBook, UpdateBook, DeleteBook } from '../controllers/bookController.js';
const router = express.Router();

router.post('/',CreateBook);

router.get('/',GetBooks);

router.get('/:id',GetBook);

router.put('/:id',UpdateBook);

router.delete('/:id',DeleteBook);

export default router;

