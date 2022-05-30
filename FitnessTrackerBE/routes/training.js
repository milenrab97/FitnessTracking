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
    const { id: users_id } = jwtDecode(token)

    const date = new Date(req.query.date)

    try {
        const query = 'SELECT mm.*, e.name as exerciseName, mg.name as muscleGroup FROM user_perfmors_exercise mm JOIN exercises e ON mm.exercises_id = e.id JOIN muscle_groups mg ON e.muscle_groups_id = mg.id WHERE users_id = ?'
        const rows = await pool.query(query, users_id)
        const exercisesPerformed = rows.filter(r => {
            if (!req.query.date) {
                return true
            }

            const rDate = new Date(r.date)

            return rDate.getMonth() === date.getMonth() && rDate.getDate() === date.getDate() && rDate.getFullYear() === date.getFullYear()
        })

        res.status(200).json({ exercisesPerformed })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/track', async function (req, res) {
    const { series, repetitions, weight, exercises_id } = req.body
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
        const query = `INSERT INTO user_perfmors_exercise SET date = ?, series = ?, repetitions = ?, weight = ?, users_id = ?, exercises_id = ?`
        await pool.query(query, [date, series, repetitions, weight, users_id, exercises_id])

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