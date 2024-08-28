import { ServerApiVersion, ObjectId, MongoClient } from 'mongodb'
const uri = 'mongodb+srv://ramsscr:10512390@cluster0.h3ylurl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const connect = async () => {
    try {
        await client.connect()
        const database = client.db('musicevents')
        const dbs = {
            users: database.collection('users'),
            events: database.collection('events')
        }
        return dbs
    } catch (error) {
        console.error('Error connecting to the database.', error)
        await client.close()
    }
}