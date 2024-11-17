import mongoose from "mongoose";
import { Book} from "../Model/bookModel.js";

export const GetBooks = async (req,res) => {
    const Books = await Book.find({});
    res.status(200).json(Books);
};
export const GetBook = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message: "Book not found"});
    }
    const book = await Book.findById(id);
    res.status(200).json(book);
};
export const CreateBook = async (req,res) => {
    if(
        !req.body.title ||
        !req.body.authour ||
        !req.body.publishedYear
    ){
        return res.status(400).send({message: "Please provide all the required fields"});
    }
    const { title , authour ,publishedYear} = req.body;
    try {
      const newBook = new Book({ title , authour , publishedYear});
      const savedBook = await newBook.save();
      res.status(201).send(savedBook);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message});
    }
};

export const DeleteBook = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message: "Book not found"});
    }
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).send({message: "Book deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message});
    }
};
export const UpdateBook = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message: "Book not found"});
    }
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, {...req.body}, {new: true});
        res.status(200).send(updatedBook);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message});
    }
};


