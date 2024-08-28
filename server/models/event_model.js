import { connect } from '../db.js'
import { ObjectId } from 'mongodb'

export class EventModel {
    // Get all events
    static async getAll(id) {
        const { events } = await connect()

        const allEvents = await events.find({ user: id }).toArray()
        if (!allEvents) return false

        return allEvents
    }

    // Get an event by ID
    static async getById(id) {
        const { events } = await connect()
        const objectId = new ObjectId(id)

        const eventById = await events.findOne({ _id: objectId })
        if (!eventById) return false

        return eventById
    }

    // Create a new event
    static async create(input) {
        const { events } = await connect()
        const { insertedId } = await events.insertOne(input)

        return {
            id: insertedId,
            ...input
        }
    }

    // Update an existing event
    static async edit(id, input) {
        const { events } = await connect()
        const objectId = new ObjectId(id)

        const { acknowledged } = await events.updateOne({ _id: objectId }, { $set: input })

        if (!acknowledged) return false
        return await events.findOne({ _id: objectId })
    }

    // Delete an existing event
    static async delete(id) {
        const { events } = await connect()
        const objectId = new ObjectId(id)

        const { deletedCount } = await events.deleteOne({ _id: objectId })
        return deletedCount > 0
    }
}