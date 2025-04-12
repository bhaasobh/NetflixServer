require('dotenv').config();
const os = require('os');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./middlewares/auth');
const UserRoutes = require('./routers/userRoutes');
const AvatarRoutes = require('./routers/AvatarRoutes');
require('./db_connection');

const app = express(); // ✅ move this above any use of `app`

app.use(cors()); // ✅ now safe
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/avatar', AvatarRoutes);

// Set your desired IP and port
const PORT = process.env.PORT || 3001;
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}


const HOST = getLocalIPAddress();
console.log(HOST);
app.listen(PORT,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
