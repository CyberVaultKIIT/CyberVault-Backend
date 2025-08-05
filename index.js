const express = require('express')
const cors = require('cors');
const Logger = require('./utils/Logger')
const app = express()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const cors = require('cors')

require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
connectDB()

app.use(cors());

const PORT = process.env.PORT || 5000

app.use('/api', require('./routes/api'))
app.use(cors({
  origin: "http://localhost:5173",
}));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'server is running' })
  Logger.debug('Server is running on port')
})

app.listen(PORT, () => {
  Logger.log(`Server is running on port ${PORT}`)
})

// docker build -t cv/backend:latest .
// docker run --env-file .env -p 3000:3000 cv/backend
