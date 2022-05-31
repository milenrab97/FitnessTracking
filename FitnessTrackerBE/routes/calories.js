const express = require('express')
const pool = require('../database')
const jwtDecode = require('jwt-decode')
const router = express.Router()

// for the user
// if date is passed => only for that date
// if not passed => all entries for this user and caloriesLeft is omitted
router.get('/', async function (req, res) {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized.',
        })

        return
    }
    const { id: users_id, calories: userCaloriesGoal } = jwtDecode(token)

    const date = new Date(req.query.date)

    try {
        const query = 'SELECT user_takes_product.*, products.name as productName, products.carbs, products.fats, products.proteins FROM user_takes_product JOIN products ON products_id = products.id WHERE users_id = ?'
        const rows = await pool.query(query, users_id)
        const productsTaken = rows.filter(r => {
            if (!req.query.date) {
                return true
            }

            const rDate = new Date(r.date)

            return rDate.getMonth() === date.getMonth() && rDate.getDate() === date.getDate() && rDate.getFullYear() === date.getFullYear()
        })

        const caloriesTaken = productsTaken.reduce((acc, product) => {
            return acc + product.carbs * 4 + product.proteins * 4 + product.fats * 9 * (product.grams / 100)
        }, 0)

        res.status(200).json({ productsTaken, caloriesTaken, caloriesLeft: req.query.date && userCaloriesGoal && userCaloriesGoal - caloriesTaken })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/track', async function (req, res) {
    const { grams, products_id } = req.body
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized.',
        })

        return
    }

    const { id: users_id } = jwtDecode(token)
    const date = new Date()

    try {
        const query = `INSERT INTO user_takes_product SET date = ?, grams = ?, users_id = ?, products_id = ?`
        await pool.query(query, [date, grams, users_id, products_id])

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

module.exports = router