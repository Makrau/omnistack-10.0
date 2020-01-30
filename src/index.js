import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import requestLogger from './loggers/request.js';
import routes from './routes.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(requestLogger);
app.use(routes);

app.listen(3333);
