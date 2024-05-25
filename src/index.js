require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./db/index');

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

(async () => {
  try {
    await connectDB();
    server.listen(PORT, async () => {
      console.log(`Server is listening on.. ${PORT}`);
    });
  } catch (e) {
    console.log('Error connecting database', e);
  }
})();