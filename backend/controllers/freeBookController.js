import freeBookModel from '../models/freeBookModel.js'

const getFreeBooks = async (req, res) => {
    try {
        const freebooks = await freeBookModel.find();
        res.status(200).json(freebooks)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
const readFreeBook = async (req,res) => {
    try {
        const id = req.params.id;
        const book = await freeBookModel.findOne({ _id: id });
        res.json({ book: book })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}
export {
    getFreeBooks,
    readFreeBook,
}