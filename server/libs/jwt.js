import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config.js'

export const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' }, (error, encoded) => {
            if (error) reject(error)
            resolve(encoded)
        })
    })
}