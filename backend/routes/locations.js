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

    //DELETE LOCATIONS
    router.delete('/:identifier', async (req, res) => {
      const { identifier } = req.params;
    
      try {
        const pool = await sql.connect(dbConfig);
    
        // Check if the location exists
        const checkResult = await pool.request()
          .input('identifier', sql.NVarChar, identifier)
          .query(`SELECT * FROM locations WHERE [name] = @identifier`);
    
        if (checkResult.recordset.length === 0) {
          return res.status(404).json({ message: 'Location not found.' });
        }
    
        // Perform the delete
        await pool.request()
          .input('identifier', sql.NVarChar, identifier)
          .query('DELETE FROM locations WHERE [name] = @identifier');
    
        res.status(200).json({ message: 'Location deleted successfully.' });
    
      } catch (err) {
        console.error('Error deleting Location:', err);
        res.status(500).json({ message: 'An error occurred while deleting the Location.' });
      }
    });
    module.exports = router;


