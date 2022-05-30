const express = require('express')
const pool = require('../database')
const router = express.Router()

const withCalories = (product) => ({ ...product, calories: product.carbs * 4 + product.proteins * 4 + product.fats * 9 })

router.get('/', async function (req, res) {
    try {
        const query = 'SELECT * FROM products'
        const rows = await pool.query(query)

        res.status(200).json(rows.map(withCalories))
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async function (req, res) {
    try {
        const query = 'SELECT * FROM products WHERE id = ?'
        const rows = await pool.query(query, req.params.id)

        res.status(200).json(withCalories(rows[0]))
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async function (req, res) {
    const { name, carbs, fats, proteins } = req.body

    try {
        const query = `INSERT INTO products SET name = ?, carbs = ?, fats = ?, proteins = ?`
        await pool.query(query, [name, carbs, fats, proteins])

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
    const { name, carbs, fats, proteins } = req.body

    try {
        const query = `UPDATE products
        SET name = ?, carbs = ?, fats = ?, proteins = ?
        WHERE id = ?`
        await pool.query(query, [name, carbs, fats, proteins, req.params.id])

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
        const query = 'DELETE FROM products WHERE id = ?'
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