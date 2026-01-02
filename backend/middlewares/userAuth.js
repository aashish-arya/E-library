import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).json({ success: false, message: 'Please login first' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded._id
        req.userEmail = decoded.email
        next()
    } catch (error) {
        console.error("Auth error:", error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Session expired. Please login again' })
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token. Please login again' })
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export default authMiddleware