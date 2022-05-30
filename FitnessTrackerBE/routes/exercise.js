const express = require('express')
const pool = require('../database')
const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const query = 'SELECT * FROM exercises'
        const rows = await pool.query(query)

        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async function (req, res) {
    try {
        const query = 'SELECT * FROM exercises WHERE id = ?'
        const rows = await pool.query(query, req.params.id)

        res.status(200).json(rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async function (req, res) {
    const { name, description, muscle_groups_id } = req.body

    try {
        const query = `INSERT INTO exercises SET name = ?, description = ?, muscle_groups_id = ?`
        await pool.query(query, [name, description, muscle_groups_id])

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
    const { name, description, muscle_groups_id } = req.body

    try {
        const query = `UPDATE exercises
        SET name = ?, description = ?, muscle_groups_id = ?
        WHERE id = ?`
        await pool.query(query, [name, description, muscle_groups_id, req.params.id])

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
        const query = 'DELETE FROM exercises WHERE id = ?'
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