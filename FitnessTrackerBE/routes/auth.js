const express = require('express')
const pool = require('../database')
const router = express.Router()
const jwt = require('jsonwebtoken')

const secret = 'secret'

router.post('/login', async function (req, res) {
    const { username, password } = req.body
    console.log(req.body)

    try {
        const query = 'SELECT * FROM users WHERE username = ?'
        const users = await pool.query(query, username)
        const user = users[0]

        if (!user || !user.username) {
            res.status(404).json({
                success: false,
                message: `User ${username} not found!`,
            })
        } else {
            const passwordIsValid = password === user.password
            if (!passwordIsValid) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized.',
                })
            } else {
                const token = jwt.sign(
                    {
                        id: user.id,
                        username: user.username,
                        calories: user.calories
                    },
                    secret,
                    {
                        expiresIn: 3600000,
                    }
                )
                res.status(200).json({
                    auth: true,
                    token,
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        })
    }
})

module.exports = router