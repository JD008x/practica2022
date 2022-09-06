require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

connectToDatabase().catch(err => console.log(err));

async function connectToDatabase() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log('Connected to Database');
}

app.use(express.json);

const inventoryRouter = require('./routes/inventoryRoutes');
app.use('/inventory', inventoryRouter);

app.listen(process.env.PORT, () => console.log('Server started at https://localhost:'+process.env.PORT));