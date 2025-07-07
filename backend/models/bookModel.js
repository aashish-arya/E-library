import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true}
})

const bookModel = mongoose.model('book',bookSchema);

export default bookModel;