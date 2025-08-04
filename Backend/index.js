const express = require('express');
const app = express();
const authRoutes = require('./route/Authrouter');  // ✅ Update path if needed
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Parse JSON body

// Routes
app.use('/auth', authRoutes); // ✅ This must come AFTER express.json()

// DB Connection
mongoose.connect(process.env.MONGO_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Mongo error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
