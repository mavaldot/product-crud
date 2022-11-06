import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/routes.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  mongoose.connect(process.env.MONGODB_URI);
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
  routes(app);
})