// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// module.exports = pool;
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://sunny786786786sy:JzXYvtzF6GdFaaT4@grootherb.vmgtijy.mongodb.net/?retryWrites=true&w=majority&appName=grootherb";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));