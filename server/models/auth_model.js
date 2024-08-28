import bcrypt from 'bcrypt'
import { connect } from '../db.js'
import { ObjectId } from 'mongodb'

export class AuthModel {
    // Register an user on the web
    static async register(input) {
        const { users } = await connect()
        const { username, email, password } = input

        const existing_user = await users.countDocuments({ email })
        if (existing_user === 1) return false

        const encrypted_password = await bcrypt.hash(password, 10)
        const newUser = {
            username,
            email,
            password: encrypted_password
        }

        const { insertedId } = await users.insertOne(newUser)
        return {
            id: insertedId,
            username,
            email
        }
    }

    // Login to the protected website
    static async login(input) {
        const { users } = await connect()
        const { email, password } = input

        const existing_user = await users.findOne({ email })
        if (!existing_user) return false

        const validating_password = await bcrypt.compare(password, existing_user.password)
        return validating_password ? existing_user : false
    }

    // Into the user's profile
    static async getUserData(id) {
        const { users } = await connect()
        const objectId = new ObjectId(id)
        
        const loggedUser = await users.findOne({ _id: objectId })
        if (!loggedUser) return false

        return loggedUser
    }

    // Validating Token
    static async validateToken(id) {
        const { users } = await connect()
        const objectId = new ObjectId(id)

        const foundUser = await users.findOne({ _id: objectId })
        if (!foundUser) return false

        return foundUser
    }
}