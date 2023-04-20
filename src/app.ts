import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config()

// DB
mongoose.connect(process.env.MONGO_CONNECTION!!)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log("Connected to DB"))

// APP
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ROUTES
app.get('/', (req, res) => res.send('Chat App\nyours truly,\nXhunn'))


// START
app.listen(process.env.PORT || port, () => console.log(`Server started on port ${port}`))