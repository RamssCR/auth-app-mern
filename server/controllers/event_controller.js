import { partiallyValidateEvent, validateEvent } from '../schemas/event_validations.js'
import { EventModel } from '../models/event_model.js'

export class EventController {
    // Get all events
    static async getAll(req, res) {
        // Display all events --> Create Collection on MongoDB
        const id = req.user
        const allEvents = await EventModel.getAll(id)
        if (!allEvents) return res.status(400).json({ message: 'events not found' })

        return res.json({ events: allEvents })
    }

    // Get an event by ID
    static async getById(req, res) {
        const { id } = req.params
        const fetchedEvent = await EventModel.getById(id)
        if (!fetchedEvent) return res.status(400).json({ message: 'event not found' })

        return res.json(fetchedEvent)
    }

    // Create a new event
    static async create(req, res) {
        const result = validateEvent(req.body)
        if (result.error) {
            const container = []
            const errors = JSON.parse(result.error.message)
            errors.map(e => {
                container.push(e.message)
                
            })
            return res.status(422).json(container)
        }

        result.data.user = req.user
        const newEvent = await EventModel.create(result.data)

        return res.status(201).json({ createdEvent: newEvent })
    }

    // Update an existing event
    static async edit(req, res) {
        const { id } = req.params
        const result = partiallyValidateEvent(req.body)
        if (result.error) {
            const container = []
            const errors = JSON.parse(result.error.message)
            errors.map(e => {
                container.push(e.message)
                
            })
            return res.status(422).json(container)
        }
        
        const fetchedEvent = await EventModel.edit(id, result.data)
        if (!fetchedEvent) return res.status(400).json({ message: 'Event not found' })

        return res.json({ modifiedEvent: fetchedEvent })
    }

    // Delete an existing event
    static async delete(req, res) {
        const { id } = req.params
        const deleteEvent = await EventModel.delete(id)
        if (!deleteEvent) return res.status(400).json({ message: 'Event not found' })

        return res.json({ message: 'Event deleted successfully' })
    }
}