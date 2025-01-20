const express = require('express');
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

const router = express.Router();

//get locations
router.get('/', async (req, res) => {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM locations');
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error fetching locations:', err);
      res.status(500).send('Unable to fetch locations. Please try again later.');
    }
  });
//post locaitions
router.post('/', async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res.status(400).send('Location name is required.');    
    }
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
        .input('name', sql.NVarChar, name)
        .query('INSERT INTO locations (name) VALUES (@name)');
        res.status(201).send("Location added succesfully.");
    }catch (err) {
        console.error('Error adding location:', err);
        res.status(500).send('An error occurred while adding the location');
    }
    });
    module.exports = router;


