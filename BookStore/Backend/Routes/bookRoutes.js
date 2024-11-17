import express from "express";
import { CreateBook, DeleteBook, GetBook, GetBooks, UpdateBook } from "../Controllers/bookController.js";

const BookRouter = express.Router();

BookRouter.post('/', CreateBook);
BookRouter.get('/', GetBooks);
BookRouter.get('/:id', GetBook);
BookRouter.delete('/:id', DeleteBook);
BookRouter.put('/:id', UpdateBook);

export default BookRouter;