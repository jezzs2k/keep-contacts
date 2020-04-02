const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');

//connectDB
connectDB();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Define router
app.use('/api/users', require('./routers/users'));
app.use('/api/auth', require('./routers/auth'));
app.use('/api/contacts', require('./routers/contacts'));

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
