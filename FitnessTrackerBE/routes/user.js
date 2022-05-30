const express = require('express')
const pool = require('../database')
const router = express.Router()

router.get('/:id', async function (req, res) {
    try {
        const query = 'SELECT * FROM users WHERE id = ?'
        const rows = await pool.query(query, req.params.id)

        res.status(200).json(rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async function (req, res) {
    const { username, password, email, height = null, weight = null, age = null, calories = null } = req.body

    try {
        const query = `INSERT INTO users SET email = ?, username = ?, password = ?, height = ?, weight = ?, age = ?, calories = ?`
        await pool.query(query, [email, username, password, height, weight, age, calories])

        res.status(201).json({
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        })
    }
})

router.put('/:id', async function (req, res) {
    const { height = null, weight = null, age = null, calories = null } = req.body

    try {
        const query = `UPDATE users
        SET height = ?, weight = ?, age = ?, calories = ?
        WHERE id = ?`
        await pool.query(query, [height, weight, age, calories, req.params.id])

        res.status(201).json({
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        })
    }
})

router.delete('/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM users WHERE id = ?'
        await pool.query(query, req.params.id)

        res.status(204).json({
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        })
    }
})

module.exports = router