import bookModel from "../models/bookModel.js";

const getBook = async (req, res) => {
    try {
        const book = await bookModel.find();
        res.status(200).json({ success: true, book })
    } catch (error) {
        console.error("Error in getbook", error.message)
        res.status(500).json({ success: false, message: 'Internal error' })
    }
}

const readBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await bookModel.findOne({ _id: id });
        res.json({book: book})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}


export {
    getBook,
    readBook
}