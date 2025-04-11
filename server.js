require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routers/auth');
require('./db_connection');

const app = express(); // ✅ move this above any use of `app`

app.use(cors()); // ✅ now safe
app.use(express.json());

app.use('/api/auth', authRoutes);

// Set your desired IP and port
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST 

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});
