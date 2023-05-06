import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes'
import contactRoutes from './routes/contactRoutes'
import messageRoutes from './routes/messageRoutes'
import * as socketio from 'socket.io'

dotenv.config()

// DB
mongoose.connect(process.env.MONGO_CONNECTION!!)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log("Connected to DB"))

// APP
const app = express()
const port = parseInt(process.env.PORT as string) || 4000

// SOCKET
// const io = new socketio.Server()
// io.attach(port)
// io.on('connection', (socket) => {

//   console.log('a user connected')
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })

// })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ROUTES
app.use('/users', userRoutes)
app.use('/contacts', contactRoutes)
app.use('/messages', messageRoutes)
app.get('/', (req, res) => res.send('Chat App\nyours truly,\nXhunn'))


// START
app.listen(port, () => console.log(`Server started on port ${port}`))