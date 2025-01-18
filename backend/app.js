require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const carsRoute = require('./routes/cars');

const app = express();
const port = 3000;
app.use(cors({
  origin: 'http://localhost:4200'}));
app.use(bodyParser.json());

app.use('/cars', carsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
