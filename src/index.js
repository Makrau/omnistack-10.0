import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(routes);

app.listen(3333);
