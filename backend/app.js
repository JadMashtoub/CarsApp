require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const carsRoute = require('./routes/cars');
const locationsRoute = require('./routes/locations');


const app = express();

// const PORT = 3000; //LOCALHOST
// app.use(cors({
//   origin: 'http://localhost:4200'}));

const PORT = process.env.PORT || 8080;
  app.use(cors({
    origin: 'https://black-smoke-08f69411e.4.azurestaticapps.net'}));


app.use(bodyParser.json());

app.use('/cars', carsRoute);
app.use('/locations', locationsRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
