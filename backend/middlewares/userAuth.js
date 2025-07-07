import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).json({ success: false, message: 'Please Login First' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded._id
        req.userEmail = decoded.email
        next()
    } catch (error) {
        console.log("Auth error", error)
        res.json({ success: false, message: "Internal Server Error" })
    }
}

export default authMiddleware