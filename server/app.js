import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import { PORT } from './config.js'
import authRouter from './routes/routes.js'
import eventsRouter from './routes/events.routes.js'
const app = express()

app.use(json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.disable('x-powered-by')
app.use(morgan('dev'))

app.use('/', authRouter)
app.use('/', eventsRouter)

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))