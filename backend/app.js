require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const carsRoute = require('./routes/cars');

const app = express();
// const PORT = process.env.PORT || 8080;
const PORT = 3000; //LOCALHOST
app.use(cors({
  origin: 'http://localhost:4200'}));
app.use(bodyParser.json());

app.use('/cars', carsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
