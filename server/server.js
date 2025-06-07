require('dotenv').config();
require('./models/db'); // Your DB connection file (make sure it connects mongoose)

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Import routes
const userRouter = require('./routes/user');
const teamRouter = require('./routes/team');
const playerRouter = require('./routes/player');
const matchRouter = require('./routes/match');


// Use routes
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/players', playerRouter);
app.use('/api/matches', matchRouter);

app.use('/api', userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
