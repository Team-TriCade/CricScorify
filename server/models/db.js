const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('our db is connected');
  })
  .catch(err => console.log(err.message));