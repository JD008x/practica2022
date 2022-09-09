import express from 'express';
const app = express();
import mongoose from 'mongoose';
import {env} from './env';
import {inventoryItemRouter} from './routes/inventoryItem.routes';
import {userRouter} from './routes/user.routes';
import {inventoryLocationRouter} from './routes/inventoryLocation.routes';

connectToDatabase().catch(err => console.log(err));

async function connectToDatabase() {
  await mongoose.connect(env.DATABASE_URL);
  console.log('Connected to Database');
}

app.use(express.urlencoded({ extended: false }));

    app.use(express.json());

app.use('/inventory', inventoryItemRouter);
app.use('/user', userRouter);
app.use('/location', inventoryLocationRouter);
app.listen(env.PORT, () => console.log('Server started on PORT '+env.PORT));