const express = require('express');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');
const teamRoutes = require('./routes/teamRoutes');
const config = require('./config/config');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();
// Middleware
app.use(express.json());

connectDB();
// Routes
app.get('/',(req,res,next)=>{
    console.log(req.header);
    res.send("Welcome to Cyber Vault!!")
})
app.use('/api/forms', formRoutes);
app.use('/api/teams', teamRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
