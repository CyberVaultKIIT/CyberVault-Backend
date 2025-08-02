const express = require('express')
const Logger = require('./utils/Logger')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')

const app = express()

// Connect to MongoDB using the dedicated function
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api', require('./routes/api'))
app.use('/api', require('./routes/member'))  // expose /api/members

// Test root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' })
  Logger.debug(`Server is running on port ${process.env.PORT || 3000}`)
})

// Start server - ONLY ONE app.listen
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  Logger.log(`Server is running on port ${PORT}`)
})
