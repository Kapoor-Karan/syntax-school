require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON payloads

app.use('/api/courses', courseRoutes);

// Connect to the database
connectDB();



// Routes
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', authRoutes); // Mount auth routes

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
