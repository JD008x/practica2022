require('dotenv').config()

import express from 'express';
const app = express();
import mongoose from 'mongoose';
import {env} from './env';
connectToDatabase().catch(err => console.log(err));

async function connectToDatabase() {
  await mongoose.connect(env.DATABASE_URL);
  console.log('Connected to Database');
}

app.use(express.urlencoded({ extended: false }));

    app.use(express.json());

const inventoryRouter = require('./routes/inventoryRoutes');
app.use('/inventory', inventoryRouter);

app.listen(process.env.PORT, () => console.log('Server started on PORT '+process.env.PORT));