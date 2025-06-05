const express = require('express');
require('dotenv').config();
require('./models/db'); // Your DB connection file (make sure it connects mongoose)
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use('/api', userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
