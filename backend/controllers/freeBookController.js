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
export {
    getFreeBooks
}