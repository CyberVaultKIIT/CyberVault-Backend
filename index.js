const express = require('express');
const Logger = require('./utils/Logger')
const app = express();
const connectDB = require('./config/db');

require('dotenv').config();
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 5000;


app.route('/api','./routes/api');

app.get('/',(req,res)=>{
  return res.status(200).json({message:"server is running"})
  Logger.debug("Server is running on port")
})

app.listen(PORT, () => {
  Logger.log(`Server is running on port ${PORT}`);
});



// docker build -t cv/backend:latest .
// docker run --env-file .env -p 3000:3000 cv/backend