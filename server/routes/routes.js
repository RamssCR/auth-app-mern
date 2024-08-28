import { Router } from 'express'
import { AuthController } from '../controllers/auth_controller.js'
import { authRequired } from '../middlewares/validateToken.js'
const router = Router()

// AUTHENTICATION
// --> Register
router.post('/register', AuthController.register)

// --> Login
router.post('/login', AuthController.login)

// --> Logout
router.post('/logout', AuthController.logout)

// --> Validate Token
router.get('/validateToken', AuthController.validateToken)

// PROFILE
// --> Profile
router.get('/profile', authRequired, AuthController.getUserData)

export default router