// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const treeRoutes = require('./routes/treeRoutes.js');
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow your Vite React frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: specify allowed methods
//   credentials: true               // Optional: allow cookies if needed
// }));
// app.use(express.json());


// app.use('/api/', treeRoutes);


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const treeRoutes = require('./routes/treeRoutes.js');

// Allow all origins for development/testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/', treeRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

