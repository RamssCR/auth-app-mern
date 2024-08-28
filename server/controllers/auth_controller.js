import { createToken } from '../libs/jwt.js'
import { AuthModel } from '../models/auth_model.js'
import { validateRegistration, validateLoginData } from '../schemas/auth_validations.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config.js'

export class AuthController {
    // Register an user on the web
    static async register(req, res) {
        const result = validateRegistration(req.body)
        if (result.error) {
            const container = []
            const errors = JSON.parse(result.error.message)
            errors.map(e => {
                container.push(e.message)
                
            })
            return res.status(422).json(container)
        }

        const newUser = await AuthModel.register(result.data)
        if (!newUser) return res.status(401).json(['an user already exists with this email'])

        const encoded = await createToken(newUser)
        
        res.cookie('token', encoded).status(201).json({ 
            message: 'user was created successfully',
            user: newUser
        })
    }

    // Login into the protected website
    static async login(req, res) {
        const result = validateLoginData(req.body)
        if (result.error) {
            const container = []
            const errors = JSON.parse(result.error.message)
            errors.map(e => {
                container.push(e.message)
                
            })
            return res.status(422).json(container)
        }

        const validatingUser = await AuthModel.login(result.data)
        if (!validatingUser) return res.status(400).json(['invalid user or password'])

        const encoded = await createToken({ id: validatingUser._id })
        res.cookie('token', encoded).json({ 
            message: 'Access granted',
            user: validatingUser
        })
    }

    // Logout from the protected website
    static logout(req, res) {
        res.cookie('token', '', { expires: new Date(0) }).sendStatus(200)
    }

    // Into the user's profile
    static async getUserData(req, res) {
        const id = req.user

        const loggedUser = await AuthModel.getUserData(id)
        if (!loggedUser) return res.status(400).json({ message: 'user not found' })

        res.json({
            id: loggedUser._id,
            username: loggedUser.username,
            email: loggedUser.email
        })
    }

    // Validating token
    static async validateToken(req, res) {
        const { token } = req.cookies
        if (!token) return res.status(401).json({ message: 'Unauthorized' })
            
        jwt.verify(token, JWT_SECRET_KEY, async (err, user) => {
            if (err) return res.status(401).json({ message: 'Unauthorized' })
        
            const foundUser = await AuthModel.validateToken(user.id)
            if (!foundUser) return res.status(401).json({ message: 'user does not exist' })
            
            return res.json({
                id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email
            })
        })
    }
}