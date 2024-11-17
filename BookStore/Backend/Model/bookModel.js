import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    authour:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
}
)

export const Book = mongoose.model('Book',BookSchema)