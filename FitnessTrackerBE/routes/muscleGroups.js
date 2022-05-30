const express = require('express')
const pool = require('../database')
const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const query = 'SELECT * FROM muscle_groups'
        const rows = await pool.query(query)

        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router