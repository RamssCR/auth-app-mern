import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config.js'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'user not authorized' })

    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).json({ message: 'Invalid token' })
        req.user = decoded.id
    })
    next()
}