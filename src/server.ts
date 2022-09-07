require('dotenv').config()

import express from 'express';
const app = express();
import mongoose from 'mongoose';
import {env} from './env';
import {router} from './routes/inventoryRoutes';

connectToDatabase().catch(err => console.log(err));

async function connectToDatabase() {
  await mongoose.connect(env.DATABASE_URL);
  console.log('Connected to Database');
}

app.use(express.urlencoded({ extended: false }));

    app.use(express.json());

app.use('/inventory', router);

app.listen(process.env.PORT, () => console.log('Server started on PORT '+process.env.PORT));