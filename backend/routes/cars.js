const express = require('express');
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

const router = express.Router();

// GET all cars
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM cars');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).send('Unable to fetch cars. Please try again later.');
  }
});

// POST 
router.post('/', async (req, res) => {
  const { name, model, hasPlates, plateNo, keyNo, hasBooks } = req.body;

  const hasPlatesBool = hasPlates === 'true' || hasPlates === true;
  const hasBooksBool = hasBooks === 'true' || hasBooks === true;

  console.log('Request Body:', req.body);

  if (!name || !model || !keyNo || hasBooks == null || hasPlates == null) {
    return res.status(400).send('All required fields must be provided.');
  }

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('model', sql.NVarChar, model)
      .input('hasPlates', sql.Bit, hasPlatesBool)
      .input('plateNo', sql.NVarChar, plateNo || null)
      .input('keyNo', sql.NVarChar, keyNo)
      .input('hasBooks', sql.Bit, hasBooksBool)
      .query(
        `INSERT INTO cars ([name], model, hasPlates, plateNo, keyNo, hasBooks) 
         VALUES (@name, @model, @hasPlates, @plateNo, @keyNo, @hasBooks)`
      );

    res.status(201).send('Car added successfully.');
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).send('An error occurred while adding the car.');
  }
});

// DELETE 
router.delete('/:identifier', async (req, res) => {
  const { identifier } = req.params;

  try {
    const pool = await sql.connect(dbConfig);

    const checkResult = await pool.request()
      .input('identifier', sql.NVarChar, identifier)
      .query(`SELECT * FROM cars WHERE [carID] = @identifier OR plateNo = @identifier`);

    if (checkResult.recordset.length === 0) {
      return res.status(404).send('Car not found.');
    }

    // Delete the car by id or optionally plateNo if known
    await pool.request()
      .input('identifier', sql.NVarChar, identifier)
      .query(`DELETE FROM cars WHERE [carID] = @identifier OR plateNo = @identifier`);

    res.status(200).send('Car deleted successfully.');
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).send('An error occurred while deleting the car.');
  }
});

module.exports = router;