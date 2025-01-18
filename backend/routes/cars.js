const express = require('express');
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

const router = express.Router();

// GET 
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM cars');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).send('An error occurred.');
  } finally {
    sql.close();
  }
});
//POST
router.post('/', async (req, res) => {
    const { name, model, hasPlates, plateNo, keyNo } = req.body;
  
    console.log('Request Body:', req.body);
  
    if (!name || !model || !plateNo || !keyNo) {
      return res.status(400).send('All required fields must be provided.');
    }
  
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request()
        .input('name', sql.NVarChar, name)
        .input('model', sql.NVarChar, model)
        .input('hasPlates', sql.NVarChar, hasPlates || null)
        .input('plateNo', sql.NVarChar, plateNo)
        .input('keyNo', sql.NVarChar, keyNo)
        .query(
          `INSERT INTO cars ([name], model, hasPlates, plateNo, keyNo) 
           VALUES (@name, @model, @hasPlates, @plateNo, @keyNo)`
        );
  
      res.status(201).send('Car added successfully.');
    } catch (err) {
      console.error('Error adding car:', err);
      res.status(500).send('An error occurred.');
    } finally {
      sql.close();
    }
  });

module.exports = router;