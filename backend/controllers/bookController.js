import bookModel from "../models/bookModel.js";

const getBook = async (req, res) => {
    try {
        const book = await bookModel.find();
        res.status(200).json({success: true, book})
    } catch (error) {
        console.error("Error in getbook", error.message)
        res.status(500).json({ success: false, message: 'Internal error' })
    }
}

export {
    getBook,
}