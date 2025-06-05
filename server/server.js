const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');

const User = require('./models/user');

const app = express();
app.use(express.json());
app.use(userRouter);


app.listen(8000,() => {
  console.log('port is listening');
});