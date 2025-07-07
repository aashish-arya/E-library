import mongoose from "mongoose";

const freeBookSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
})

const freeBookModel = mongoose.model('freebook', freeBookSchema);

export default freeBookModel;