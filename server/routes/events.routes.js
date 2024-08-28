import { Router } from 'express'
import { EventController } from '../controllers/event_controller.js'
import { authRequired } from '../middlewares/validateToken.js'
const router = Router()

// --> Get all events
router.get('/events', authRequired, EventController.getAll)

// --> Get an event by ID
router.get('/events/:id', authRequired, EventController.getById)

// --> Create a new event
router.post('/events', authRequired, EventController.create)

// --> Update an event
router.patch('/events/:id', authRequired, EventController.edit)

// --> Delete an event
router.delete('/events/:id', authRequired, EventController.delete)

export default router